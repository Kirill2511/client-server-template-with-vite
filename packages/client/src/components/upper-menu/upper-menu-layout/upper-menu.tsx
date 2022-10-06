import React, { MouseEvent, useState } from 'react'
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom';
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
import { LeaderPage } from '../../leaderboard/leaderPage/leaderpage';
import { PhorumMainPage } from '../../phorum/phorum-main-page/phorum-main-page';

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
    //link: handleClick,
    link:"/profile",
  },
  {
    text: 'Форум',
    //link: handleClick,
    link: "/phorum",
  },
  {
    text: 'Доска почета',
    //link: handleClick,
    link: "/leaderboard",
  },
  {
    text: 'Настройки',
    //link: handleClick,
    link: "/settings",
  },
  {
    text: 'Как играть',
    //link: handleClick,
    link: "/howto",
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
              onClick={() => setIsNight(true)}
              key="night"
            />
          )}
          {!!isNight && (
            <UpperMenuItem
              text="Дневная тема"
              onClick={() => setIsNight(false)}
              key="night"
            />
          )}
          <UpperMenuItem text="Выйти" onClick={handleLogout} key="logout" />
        </ul>
      </div>

    </div>


  )
}
