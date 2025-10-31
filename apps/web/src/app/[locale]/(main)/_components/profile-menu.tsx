'use client'

import { Spinner } from '../../../../components/common/spinner'
import { Button } from '../../../../components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar'
import { HeartIcon, LogOut, User2, UserRoundIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu'
import { useSession } from '@/hooks/use-session'
import { useTranslations } from 'next-intl'

interface ProfileMenuProps {
  interactable?: boolean
}

export function ProfileMenu({ interactable = true }: ProfileMenuProps) {
  const t = useTranslations('main.layout.header.profileMenu')

  const { me, isAuthenticating, signIn, signOut } = useSession()

  if (isAuthenticating) {
    return (
      <div className="items-center flex justify-end h-9">
        <Spinner className="mr-2 h-6 w-6 text-primary" />
      </div>
    )
  }

  return (
    <div className="items-center gap-1 flex text-sm h-9">
      {me ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className={`items-center gap-2 flex text-sm px-2 ${interactable ? '' : 'pointer-events-none'}`}
            >
              <Button variant="ghost">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={me.imageUrl as unknown as string | undefined}
                    alt={me.name}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal text-muted-foreground">
                  {t('signedInAs')}{' '}
                  <strong className="text-white">{me.name}</strong>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User2 />
                  {t('profile')}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HeartIcon />
                  {t('favorites')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                  <LogOut />
                  {t('signOut')}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="items-center gap-2 flex px-2"
            onClick={signIn}
          >
            <div className="items-center flex justify-center rounded-xl bg-muted h-7 w-7">
              <UserRoundIcon />
            </div>
          </Button>
        </>
      )}
    </div>
  )
}
