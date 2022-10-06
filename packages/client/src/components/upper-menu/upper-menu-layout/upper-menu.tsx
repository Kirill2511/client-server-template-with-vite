import React from 'react'
import { UpperMenuItem } from '../upper-menu-item/upper-menu-item';
import "./upper-menu.scss";
import { APIurls, defaulAvatar, filePrefix } from '../../../consts/prefix';

export type UserProps = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
   
}

// interface MenuLinks {
//   text: string,
//   link: Function,
// }
function handleClick(e: Event) {
  e.preventDefault();
  console.log("CLICK" + e.target);
} 

async function logout() {
  const response = await fetch(APIurls.LOGOUT, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

function handleLogout(e: Event) {
  e.preventDefault();
  logout()
  .then(response => {
    console.log(response);
  })
}


const menuLinks = [
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
    link: () => {
      console.log("НУ НАЖАЛИ");
    },
  },
  {
    text: 'Настройки',
    link: handleClick,
  },
  {
    text: 'Как играть',
    link: handleClick,
  },
  {
    text: 'Ночная тема',
    link: handleClick,
  },
  {
    text: 'Выйти',
    link: handleLogout,
  },
]

export const UpperMenu: React.FC<UserProps> = (props) => {
  const {avatar, first_name, second_name, display_name} = props;
  const avatarUrl = avatar
  ? `${filePrefix}${avatar}`
  : defaulAvatar;
  const name = display_name
  ? display_name
  : `${first_name} ${second_name}`;
  return (
    <div className="upper-menu">
      <div className="user-info">
        <div className="user-avatar">
          <img src={avatarUrl}></img>
        </div>
        <div className="user-name">{name}</div>
      </div>
      <div className="menu-list-wrapper">
        <ul className="menu-list">
          {menuLinks.map((item, index) => (
            <UpperMenuItem text={item.text} link={item.link} key={index} />
          ))}
        </ul>
      </div>
    </div>
  )
}
