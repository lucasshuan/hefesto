import { SubmitHandler, useFormContext } from 'react-hook-form'
import {
  CreateBrandDto,
  getListBrandsQueryKey,
  useCreateBrand,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'
import { useTranslations } from 'next-intl'
import { AddBrandFormFields } from './fields'
import { toastError } from '@/lib/utils/toast'

interface AddBrandFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onCompletion: () => void
}

export function AddBrandForm({ onCompletion, ...props }: AddBrandFormProps) {
  const t = useTranslations('forms')
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = useFormContext<CreateBrandDto>()

  const createBrandMutation = useCreateBrand({
    mutation: {
      onSuccess: async () => {
        reset()
        queryClient.invalidateQueries({ queryKey: getListBrandsQueryKey() })
        onCompletion()
      },
    },
  })

  const onSubmit: SubmitHandler<CreateBrandDto> = async (data) => {
    const formattedDate = new Date().toLocaleString()
    const request = createBrandMutation.mutateAsync({ data })
    toast.promise(request, {
      loading: t('common.loading'),
      success: {
        message: t('addBrand.success', {
          name: data.name,
        }),
        description: formattedDate,
      },

      error: toastError,
    })
    await request
  }

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <AddBrandFormFields />
    </form>
  )
}
