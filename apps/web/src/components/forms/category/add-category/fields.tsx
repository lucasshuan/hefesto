import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreateCategoryDto } from '@/lib/api/generated'
import { useFormContext } from 'react-hook-form'

export function AddCategoryFormFields() {
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
