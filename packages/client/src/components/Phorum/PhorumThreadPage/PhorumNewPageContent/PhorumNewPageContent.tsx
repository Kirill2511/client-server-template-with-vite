

import React, { FC } from 'react';
import { Button } from '../../../Button/Button';
import { Input } from '../../../Input/Input';
import { PhorumThreadContentProps } from '../PhorumThreadPageContent/PhorumThreadPageContent';
import { Reply } from '../Reply/Reply';
import './PhorumNewPageContent.scss';

export const PhorumNewPageContent: FC<PhorumThreadContentProps> = ({
    title = "Создать новую тему"
}) => {
    return (
        <div className="thread-wrapper">
        <h3 className="thread-header">{title}</h3>
        <div className='thread-name'>
            <Input className='thread-name__input' label="Название темы" />
        </div>
        <div className='thread-text'>
            <textarea className='thread-text__textarea' placeholder='Первое сообщение вашей темы...' />
            <div className='thread-text__button-wrapper'><Button className='thread-text__button'>{"Создать новую тему"}</Button></div>
        
        </div>
      </div>
    );
}
