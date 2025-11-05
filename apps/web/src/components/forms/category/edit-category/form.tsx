import { SubmitHandler, useFormContext } from 'react-hook-form'
import {
  CategoryDto,
  UpdateCategoryDto,
  getListCategoriesQueryKey,
  useUpdateCategory,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'
import { toastError } from '@/lib/utils/toast'
import { EditCategoryFormFields } from './fields'
import { useTranslations } from 'next-intl'

interface EditCategoryFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  category: CategoryDto
  onCompletion: () => void
}

export function EditCategoryForm({
  category,
  onCompletion,
  ...props
}: EditCategoryFormProps) {
  const t = useTranslations('forms')
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = useFormContext<UpdateCategoryDto>()

  const updateCategoryMutation = useUpdateCategory({
    mutation: {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() })
        onCompletion()
      },
    },
  })

  const onSubmit: SubmitHandler<UpdateCategoryDto> = async (data) => {
    const formattedDate = new Date().toLocaleString('pt-br')
    const request = updateCategoryMutation.mutateAsync({
      id: category.id,
      data,
    })
    toast.promise(request, {
      loading: t('common.loading'),
      success: {
        message: t('editCategory.success', {
          name: data.name ?? category.name,
        }),
        description: formattedDate,
      },
      error: toastError,
    })
    await request
  }

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <EditCategoryFormFields />
    </form>
  )
}
