import React, { FC } from 'react'
import { defaulAvatar } from '../../../../consts/prefix'
import './PhorumPost.scss'

export type PhorumPostProps = {
  userName: string
  userAvatar?: string
  text: string
  postDate: Date
}

export const PhorumPost: FC<PhorumPostProps> = ({
  userAvatar = defaulAvatar,
  userName,
  text,
  postDate,
}) => {
  const cleanText = text.replace(/(<([^>]+)>)/gm, ' ')
  const date = postDate.toLocaleString('ru')
  return (
    <li className="post">
      <div className="post__userinfo">
        <figure>
          <img className="post__avatar" src={userAvatar} alt={userName} />
          <figcaption className="post__username">{userName}</figcaption>
        </figure>
      </div>
      <div className="post__text-wrapper">
        <div className="post__text">{cleanText}</div>
        <div className="post__date">{date}</div>
      </div>
    </li>
  )
}
