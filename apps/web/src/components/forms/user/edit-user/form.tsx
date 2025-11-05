import { SubmitHandler, useFormContext } from 'react-hook-form'
import {
  UpdateUserDto,
  UserDto,
  getListUsersQueryKey,
  useUpdateUser,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import React from 'react'
import { EditUserFormFields } from './fields'

interface EditUserFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  user: UserDto
  onCompletion: () => void
}

export function EditUserForm({
  user,
  onCompletion,
  ...props
}: EditUserFormProps) {
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = useFormContext<UpdateUserDto>()

  const updateUserMutation = useUpdateUser({
    mutation: {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries({ queryKey: getListUsersQueryKey() })
        onCompletion()
      },
    },
  })

  const onSubmit: SubmitHandler<UpdateUserDto> = async (data) => {
    const formattedDate = new Date().toLocaleString('pt-br')
    const request = updateUserMutation.mutateAsync({ id: user.id, data })
    toast.promise(request, {
      loading: 'Enviando...',
      success: {
        message: `Usuário "${data.name}" editado com sucesso!`,
        description: formattedDate,
      },
      error: () => {
        const message = `Erro ao editar usuário "${data.name}".`
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
      <EditUserFormFields />
    </form>
  )
}
