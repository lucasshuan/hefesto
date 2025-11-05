import { SubmitHandler, useFormContext } from 'react-hook-form'
import {
  BrandDto,
  UpdateBrandDto,
  getListBrandsQueryKey,
  useUpdateBrand,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'
import { EditBrandFormFields } from './fields'
import { toastError } from '@/lib/utils/toast'
import { useTranslations } from 'next-intl'

interface EditBrandFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  brand: BrandDto
  onCompletion: () => void
}

export function EditBrandForm({
  brand,
  onCompletion,
  ...props
}: EditBrandFormProps) {
  const t = useTranslations('forms')
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = useFormContext<UpdateBrandDto>()

  const updateBrandMutation = useUpdateBrand({
    mutation: {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: getListBrandsQueryKey() })
        onCompletion()
      },
    },
  })

  const onSubmit: SubmitHandler<UpdateBrandDto> = async (data) => {
    const formattedDate = new Date().toLocaleString('pt-br')
    const request = updateBrandMutation.mutateAsync({ id: brand.id, data })
    toast.promise(request, {
      loading: t('common.loading'),
      success: {
        message: t('editBrand.success', { name: data.name ?? brand.name }),
        description: formattedDate,
      },
      error: toastError,
    })
    await request
  }

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <EditBrandFormFields />
    </form>
  )
}
