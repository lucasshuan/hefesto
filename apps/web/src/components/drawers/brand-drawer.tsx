'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { AddBrandForm } from '@/components/forms/brand/add-brand/form'
import { EditBrandForm } from '@/components/forms/brand/edit-brand/form'
import { DrawerFooterButtons } from '@/components/common/drawer-footer-buttons'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BrandDto, CreateBrandDto, UpdateBrandDto } from '@/lib/api/generated'
import { useTranslations } from 'next-intl'

interface BrandDrawerProps {
  data?: BrandDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BrandDrawer({ data, open, onOpenChange }: BrandDrawerProps) {
  const t = useTranslations('drawers')

  const editMode = !!data

  const methods = useForm<CreateBrandDto | UpdateBrandDto>({
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
            {editMode ? t('editBrand.title') : t('addBrand.title')}
          </DrawerTitle>
          <DrawerDescription>
            {editMode ? t('editBrand.description') : t('addBrand.description')}
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...methods}>
          <div className="mx-4 mt-2">
            {editMode ? (
              <EditBrandForm
                id={formId}
                brand={data}
                onCompletion={handleCompletion}
              />
            ) : (
              <AddBrandForm id={formId} onCompletion={handleCompletion} />
            )}
          </div>
          <DrawerFooterButtons formId={formId} onOpenChange={onOpenChange} />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}
