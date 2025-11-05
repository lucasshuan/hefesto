import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreateBrandDto } from '@/lib/api/generated'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

export function AddBrandFormFields() {
  const t = useTranslations('forms.addBrand')
  const { register } = useFormContext<CreateBrandDto>()

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="name">{t('labels.name')}</Label>
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
