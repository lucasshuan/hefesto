import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Specter } from '@/components/ui/skeleton'
import { UpdateUserDto, UserRole } from '@/lib/api/generated'
import { Controller, useFormContext } from 'react-hook-form'

export function EditUserFormFields() {
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
