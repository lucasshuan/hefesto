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
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/lib/api/generated'
import { EditCategoryForm } from '../forms/category/edit-category-form'
import { AddCategoryForm } from '../forms/category/add-category-form'

interface CategoryDrawerProps {
  data?: CategoryDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoryDrawer({
  data,
  open,
  onOpenChange,
}: CategoryDrawerProps) {
  const editMode = !!data

  const methods = useForm<CreateCategoryDto | UpdateCategoryDto>({
    defaultValues: data && { name: data.name },
  })

  function handleCompletion() {
    onOpenChange(false)
  }

  const formId = React.useId()

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {editMode ? 'Editar' : 'Adicionar'} Categoria
          </DrawerTitle>
          <DrawerDescription>
            {editMode ? 'Atualizar' : 'Adicionar'} uma categoria de componente.
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...methods}>
          <div className="mx-4 mt-2">
            {editMode ? (
              <EditCategoryForm
                id={formId}
                category={data}
                onCompletion={handleCompletion}
              />
            ) : (
              <AddCategoryForm id={formId} onCompletion={handleCompletion} />
            )}
          </div>
          <DrawerFooterButtons formId={formId} onOpenChange={onOpenChange} />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}
