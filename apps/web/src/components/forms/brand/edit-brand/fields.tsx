import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Specter } from '@/components/ui/skeleton'
import { UpdateBrandDto } from '@/lib/api/generated'
import { useFormContext } from 'react-hook-form'

export function EditBrandFormFields() {
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
