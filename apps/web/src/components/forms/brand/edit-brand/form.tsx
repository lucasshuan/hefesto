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

interface EditBrandFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  brand: BrandDto
  onCompletion: () => void
}

export function EditBrandForm({
  brand,
  onCompletion,
  ...props
}: EditBrandFormProps) {
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
      loading: 'Enviando...',
      success: {
        message: `Marca "${data.name}" editada com sucesso!`,
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
