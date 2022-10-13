import React, { FC, useState } from 'react'
import { Button } from '../../../Button/Button'
import { Input } from '../../../Input/Input'
import './Reply.scss'

type ReplyProps = {
  buttonContent?: string;
  InputPlaceholder?: string;
  InputErrorText?: string;
}

export const Reply: FC<ReplyProps> = ({
  buttonContent = 'Отправить',
  InputPlaceholder = 'Ваш ответ...',
  InputErrorText = 'HTML-теги запрещены!',
}) => {
  const [isError, setError] = useState(false)
  return (
    <div className="reply-wrapper">
      <div className="placeholder"></div>
      <form className="reply">
        <div className="reply__input">
          <textarea
            className="input__textarea"
            placeholder={InputPlaceholder}></textarea>
          <div className="error-message">{isError && InputErrorText}</div>
        </div>
        <div className="reply__button">
          <Input type="file" className="reply__hidden_input" />
          <Button
            className="reply__button_button"
            onClick={() => {
              console.log('ТУТ БУДЕТ ОТПРАВКА СООБЩЕНИЯ')
            }}>
            {buttonContent}
          </Button>
        </div>
      </form>
    </div>
  )
}
