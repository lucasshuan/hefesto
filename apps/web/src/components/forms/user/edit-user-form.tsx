import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import {
  UpdateUserDto,
  UserDto,
  UserRole,
  getListUsersQueryKey,
  useUpdateUser,
} from '@/lib/api/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Specter } from '@/components/ui/skeleton'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface EditUserFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  user: UserDto
  onCompletion: () => void
}

function EditUserForm({ user, onCompletion, ...props }: EditUserFormProps) {
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

function EditUserFormFields() {
  const { register, control, getValues } = useFormContext<UpdateUserDto>()

  const roleMap = {
    [UserRole.admin]: 'Administrador',
    [UserRole.user]: 'Usuário',
  }

  return (
    <div className="grid w-full items-center gap-3">
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

      <Label htmlFor="role">Cargo</Label>
      <Specter loading={!getValues('role')} className="h-9 w-full">
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="w-[--radix-select-trigger-width]"
              >
                {Object.entries(roleMap).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Specter>
    </div>
  )
}

export { EditUserForm, EditUserFormFields }
