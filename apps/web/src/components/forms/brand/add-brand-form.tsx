import { SubmitHandler, useFormContext } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import {
  CreateBrandDto,
  getListBrandsQueryKey,
  useCreateBrand,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'

interface AddBrandFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onCompletion: () => void
}

function AddBrandForm({ onCompletion, ...props }: AddBrandFormProps) {
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = useFormContext<CreateBrandDto>()

  const createBrandMutation = useCreateBrand({
    mutation: {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: getListBrandsQueryKey() })
        onCompletion()
      },
    },
  })

  const onSubmit: SubmitHandler<CreateBrandDto> = async (data) => {
    const formattedDate = new Date().toLocaleString('pt-br')
    const request = createBrandMutation.mutateAsync({ data })
    toast.promise(request, {
      loading: 'Enviando...',
      success: {
        message: `Marca "${data.name}" criada com sucesso!`,
        description: formattedDate,
      },
      error: (error) => {
        let message: string
        if (error.response?.status === 409)
          message = `Marca "${data.name}" já existe.`
        else message = `Erro ao criar marca "${data.name}".`
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
      <AddBrandFormFields />
    </form>
  )
}

function AddBrandFormFields() {
  const { register } = useFormContext<CreateBrandDto>()

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Nome"
          autoComplete="off"
          {...register('name')}
        />
      </div>
    </>
  )
}

export { AddBrandForm, AddBrandFormFields }
