import { useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'
import { DrawerClose, DrawerFooter } from '../ui/drawer'
import { Spinner } from './spinner'

interface DrawerFooterButtonsProps {
  formId: string
  onOpenChange: (open: boolean) => void
}

export function DrawerFooterButtons({
  formId,
  onOpenChange,
}: DrawerFooterButtonsProps) {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext()
  return (
    <DrawerFooter className="gap-2 flex mt-2 flex-row justify-end h-auto">
      <DrawerClose asChild>
        <Button
          type="button"
          className="w-24"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </DrawerClose>

      <Button
        form={formId}
        type="submit"
        className="w-24"
        disabled={!isDirty || isSubmitting}
      >
        {isSubmitting ? <Spinner className="text-white" /> : 'Enviar'}
      </Button>
    </DrawerFooter>
  )
}
