'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { DrawerFooterButtons } from '@/components/common/drawer-footer-buttons'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { UpdateUserDto, UserDto, UserRole } from '@/lib/api/generated'
import { EditUserForm } from '../forms/user/edit-user-form'

interface UserDrawerProps {
  data: UserDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDrawer({ data, open, onOpenChange }: UserDrawerProps) {
  const editMode = !!data

  const methods = useForm<UpdateUserDto>({
    defaultValues: data && { name: data.name, role: data.role as UserRole },
  })

  function handleCompletion() {
    onOpenChange(false)
  }

  const formId = React.useId()

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{editMode ? 'Editar' : 'Adicionar'} Usuário</DrawerTitle>
          <DrawerDescription>
            {editMode ? 'Atualizar' : 'Adicionar'} um usuário.
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...methods}>
          <div className="mx-4 mt-2">
            <EditUserForm
              id={formId}
              user={data}
              onCompletion={handleCompletion}
            />
          </div>
          <DrawerFooterButtons formId={formId} onOpenChange={onOpenChange} />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}
