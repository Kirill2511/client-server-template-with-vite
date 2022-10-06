import React, { MouseEvent, useState } from 'react'
import {
  MenuItemProps,
  UpperMenuItem,
} from '../upper-menu-item/upper-menu-item'
import './upper-menu.scss'
import { APIurls } from '../../../consts/prefix'
import {
  MenuUserInfo,
  UserProps,
} from '../upper-menu-user-info/upper-menu-user-info'

function handleClick(e: MouseEvent) {
  e.preventDefault()
  console.log('CLICK ' + e.currentTarget.textContent)
}

async function logout() {
  const response = await fetch(APIurls.LOGOUT, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

function handleLogout() {
  logout().then(response => {
    console.log(response)
  })
}

const menuLinks: MenuItemProps[] = [
  {
    text: 'Мой профиль',
    link: handleClick,
  },
  {
    text: 'Форум',
    link: handleClick,
  },
  {
    text: 'Доска почета',
    link: handleClick,
  },
  {
    text: 'Настройки',
    link: handleClick,
  },
  {
    text: 'Как играть',
    link: handleClick,
  },
]

const dummyUser: UserProps = {
  id: 1,
  first_name: 'Phil',
  second_name: 'Punxatawny',
  display_name: '',
  login: 'phil',
  email: 'phil@punxatawny.com',
  phone: '0192837462',
  avatar: '',
}

export const UpperMenu: React.FC = () => {
  const [isNight, setIsNight] = useState(false)
  return (
    <div className="upper-menu">
      <MenuUserInfo {...dummyUser} />

      <div className="menu-list-wrapper">
        <ul className="menu-list">
          {menuLinks.map((item, index) => (
            <UpperMenuItem text={item.text} link={item.link} key={index} />
          ))}
          {!isNight && (
            <UpperMenuItem
              text="Ночная тема"
              link={() => setIsNight(true)}
              key="night"
            />
          )}
          {!!isNight && (
            <UpperMenuItem
              text="Дневная тема"
              link={() => setIsNight(false)}
              key="night"
            />
          )}
          <UpperMenuItem text="Выйти" link={handleLogout} key="logout" />
        </ul>
      </div>
    </div>
  )
}
