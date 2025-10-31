import { TemplateUsersTable } from '@/components/templates/table/users-table'
import { useTranslations } from 'next-intl'

export default function ManageUsersPage() {
  const t = useTranslations('dashboard')
  return (
    <div className="p-2">
      <div className="flex flex-row align-middle justify-between h-9 mb-6">
        <h2 className="font-bold text-lg flex flex-row gap-3">
          {t('manageUsers.title')}
        </h2>
      </div>
      <TemplateUsersTable />
    </div>
  )
}
