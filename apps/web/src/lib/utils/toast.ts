import { AxiosError } from 'axios'
import { getTranslations } from 'next-intl/server'

export async function toastError(error: unknown) {
  const t = await getTranslations('forms')

  let message: string

  if (error instanceof AxiosError) message = error.message
  else message = t('common.genericError')

  return {
    descriptionClassName: '!text-muted-foreground',
    description: new Date().toLocaleString(),
    message,
  }
}
