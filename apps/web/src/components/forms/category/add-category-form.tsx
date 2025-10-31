import { SubmitHandler, useFormContext } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import {
  CreateCategoryDto,
  getListCategoriesQueryKey,
  useCreateCategory,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'

interface AddCategoryFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  onCompletion: () => void
}

function AddCategoryForm({ onCompletion, ...props }: AddCategoryFormProps) {
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
      loading: 'Enviando...',
      success: {
        message: `Categoria "${data.name}" criada com sucesso!`,
        description: formattedDate,
      },
      error: (error) => {
        let message: string
        if (error.response?.status === 409)
          message = `Categoria "${data.name}" já existe.`
        else message = `Erro ao criar categoria "${data.name}".`
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
      <AddCategoryFormFields />
    </form>
  )
}

function AddCategoryFormFields() {
  const { register } = useFormContext<CreateCategoryDto>()

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

export { AddCategoryForm, AddCategoryFormFields }
