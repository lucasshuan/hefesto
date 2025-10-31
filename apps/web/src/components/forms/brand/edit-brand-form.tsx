import { SubmitHandler, useFormContext } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import {
  BrandDto,
  UpdateBrandDto,
  getListBrandsQueryKey,
  useUpdateBrand,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Specter } from '@/components/ui/skeleton'
import React from 'react'

interface EditBrandFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  brand: BrandDto
  onCompletion: () => void
}

function EditBrandForm({ brand, onCompletion, ...props }: EditBrandFormProps) {
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
      error: () => {
        const message = `Erro ao editar marca "${data.name}".`
        return {
          descriptionClassName: '!text-muted-foreground',
          description: new Date().toLocaleString('pt-br'),
          message,
        }
      },
    })
    await request
  }

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <EditBrandFormFields />
    </form>
  )
}

function EditBrandFormFields() {
  const { register, getValues } = useFormContext<UpdateBrandDto>()

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="name">Nome</Label>
        <Specter loading={!getValues('name')} className="h-9 w-full">
          <Input
            id="name"
            type="text"
            placeholder="Nome"
            autoComplete="off"
            {...register('name')}
          />
        </Specter>
      </div>
    </>
  )
}

export { EditBrandForm, EditBrandFormFields }
