import {
  Injectable,
  Logger,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { tap, type Observable } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const req = context.switchToHttp().getRequest<Request>()
    const { method, originalUrl } = req

    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse<Response>()
        const duration = Date.now() - now
        const msg = `${method} ${originalUrl} ${res.statusCode} - ${duration}ms`

        if (res.statusCode >= 400)
          this.logger.error(`${msg}\n${JSON.stringify(data)}`)
        else this.logger.log(msg)
      })
    )
  }
}
