import React, { MouseEventHandler } from 'react'
//import React from 'react'
import { NavLink } from 'react-router-dom'

export type MenuItemProps = {
  text: string
  onClick?: MouseEventHandler<HTMLLIElement>
  link?: string,
  title?: string
}

export const UpperMenuItem: React.FC<MenuItemProps> = props => {
  const { text, link, title, onClick } = props
  const item = link ? <NavLink to={link}>{text}</NavLink> : text

  return (
    <li className="menu-list__item" onClick={onClick} title={title ? title : text}> 
      {item}
    </li>
  )
}


