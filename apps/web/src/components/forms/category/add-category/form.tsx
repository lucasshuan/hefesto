import { SubmitHandler, useFormContext } from 'react-hook-form'
import {
  CreateCategoryDto,
  getListCategoriesQueryKey,
  useCreateCategory,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'
import { AddCategoryFormFields } from './fields'
import { toastError } from '@/lib/utils/toast'
import { useTranslations } from 'next-intl'

interface AddCategoryFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  onCompletion: () => void
}

export function AddCategoryForm({
  onCompletion,
  ...props
}: AddCategoryFormProps) {
  const t = useTranslations('forms')
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = useFormContext<CreateCategoryDto>()

  const createCategoryMutation = useCreateCategory({
    mutation: {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() })
        onCompletion()
      },
    },
  })

  const onSubmit: SubmitHandler<CreateCategoryDto> = async (data) => {
    const formattedDate = new Date().toLocaleString('pt-br')
    const request = createCategoryMutation.mutateAsync({ data })
    toast.promise(request, {
      loading: t('common.loading'),
      success: {
        message: t('addCategory.success', { name: data.name }),
        description: formattedDate,
      },
      error: toastError,
    })
    await request
  }

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <AddCategoryFormFields />
    </form>
  )
}
