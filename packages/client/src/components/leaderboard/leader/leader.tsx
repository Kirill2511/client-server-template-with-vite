import React from 'react';
import { defaulAvatar } from '../../../consts/prefix';
import { UserAvatar } from '../../UserAvatar/userAvatar';
import './leader.scss';

export type LeaderProps = {
  avatar?: string,
  name: string,
  onClick?: () => void,
  score: string,
}

export const LeaderItem: React.FC<LeaderProps> = ({
  avatar = defaulAvatar,
  name,
  onClick = () => console.log("ТУТ БУДЕТ ССЫЛКА НА ПРОФИЛЬ"),
  score,
  ...props
}) => {

  return (
    <li className="leader-list__item">
      <UserAvatar username={name} avatarPath={avatar} classname="avatar" onClick={onClick}/>
      <div className="name" onClick={onClick}>{name}</div>
      <div className="score">{score}</div>
    </li>
  )
}
