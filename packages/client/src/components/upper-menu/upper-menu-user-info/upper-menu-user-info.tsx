import React from 'react'
import { defaulAvatar, filePrefix } from '../../../consts/prefix'
import { UserAvatar } from './../../UserAvatar/userAvatar';
import './upper-menu-user-info.scss'

export type UserProps = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export const MenuUserInfo: React.FC<UserProps> = props => {
  const { avatar, first_name, second_name, display_name } = props
  const avatarUrl = avatar ? `${filePrefix}${avatar}` : defaulAvatar
  const name = display_name ? display_name : `${first_name} ${second_name}`

  return (
    <div className="user-info">
      <UserAvatar avatarPath={avatarUrl} />
      <div
        className="user-name"
        onClick={() => console.log('ТУТ ДОЛЖЕН БЫТЬ ПЕРЕХОД НА ПРОФИЛЬ')}>
        {name}
      </div>
    </div>
  )
}
