import React, { FC } from 'react';
import classNames from 'classnames';

import defaultAvatar from '../../assets/avatar.svg';

import './avatar.scss';

type AvatarProps = {
  avatarPath?: string;
  onClick: () => void;
  className?: string;
  name?: string;
};

export const Avatar: FC<AvatarProps> = ({ avatarPath, onClick, name, className }) => {
  return (
    <div className={classNames('avatar', className)}>
      <div className="avatar__img-wrapper" onClick={onClick}>
        <img className="avatar__img" src={avatarPath ? avatarPath : defaultAvatar} alt="Аватар" />
        <span className="avatar__text"> Поменять аватар </span>
      </div>
      {name && <h3 className="avatar__person-name">{name}</h3>}
    </div>
  );
};
