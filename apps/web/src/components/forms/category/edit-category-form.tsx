import { SubmitHandler, useFormContext } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import {
  CategoryDto,
  UpdateCategoryDto,
  getListCategoriesQueryKey,
  useUpdateCategory,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Specter } from '@/components/ui/skeleton'
import React from 'react'

interface EditCategoryFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  category: CategoryDto
  onCompletion: () => void
}

function EditCategoryForm({
  category,
  onCompletion,
  ...props
}: EditCategoryFormProps) {
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
      <EditCategoryFormFields />
    </form>
  )
}

function EditCategoryFormFields() {
  const { register, getValues } = useFormContext<UpdateCategoryDto>()

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

export { EditCategoryForm, EditCategoryFormFields }
