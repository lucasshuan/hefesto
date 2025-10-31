import {
  Catch,
  HttpException,
  HttpStatus,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common'
import type { Response } from 'express'

type PgError = { code?: string; detail?: string; constraint?: string }

function extractDetail(e: PgError) {
  const m = e.detail?.match(/Key \((.+)\)=\((.+)\)/)
  if (!m) return null
  const [, field, value] = m
  return { field, value }
}

@Catch()
export class PgExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp()
      const res = ctx.getResponse<Response>()
      const status = exception.getStatus()
      return res.status(status).json(exception.getResponse())
    }

    const err = exception as PgError

    if (!err?.code) {
      const ctx = host.switchToHttp()
      const res = ctx.getResponse<Response>()
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ statusCode: 500, message: 'Internal Server Error' })
    }

    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal Server Error'

    switch (err.code) {
      case '23505': {
        status = HttpStatus.CONFLICT
        const det = extractDetail(err)
        message = det
          ? `Duplicate value: ${det.field} "${det.value}".`
          : 'Duplicate record (unique constraint violation).'
        break
      }
      case '23503':
        status = HttpStatus.BAD_REQUEST
        message = 'Invalid reference (foreign key constraint).'
        break
      case '23502':
        status = HttpStatus.BAD_REQUEST
        message = 'Missing required field (NOT NULL constraint).'
        break
      case '23514':
        status = HttpStatus.BAD_REQUEST
        message = 'Rule violation (CHECK constraint).'
        break
      case '22P02':
        status = HttpStatus.BAD_REQUEST
        message = 'Invalid data format.'
        break
    }

    return res.status(status).json({
      statusCode: status,
      message,
      code: err.code,
      constraint: (exception as PgError)?.constraint,
    })
  }
}
