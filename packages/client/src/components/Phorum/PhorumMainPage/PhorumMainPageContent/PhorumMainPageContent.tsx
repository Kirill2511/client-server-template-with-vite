import React, { FC, useRef, useState } from 'react'
//import ReactDOM from 'react-dom/client'
//import { Button } from '../../../Button/Button'
import { Input } from '../../../Input/Input'
import { Popup } from '../../../Popup/Popup'
import { MainListHeader } from '../PhorumMainListHeader/PhorumMainListHeader'
import { ThreadList } from '../PhorumThreadList/PhorumThreadList'
import { ThreadListItemProps } from '../PhorumThreadListItem/PhorumThreadListItem'
import './PhorumMainPageContent.scss'

type PhorumThreadListProps = {
  title?: string
}

const dummyList: ThreadListItemProps[] = [
  {
    thread: 'Как вы ставите палку - горизонтально или вертикально?',
    author: 'Душка Фулгрим!!',
    startDate: '28-09-22',
    pageCount: 13,
    replies: '237 ответов',
    lastReplyUser: 'Сангвиний',
    lastReplyDate: '30 сен 2022 18:53',
  },
  {
    thread: 'На какой планете вас нашли!!!',
    pageCount: 5,
    author: 'Фабиуссс',
    startDate: '26-09-22',
    replies: '45 ответов',
    lastReplyUser: 'Перт Железная Башка',
    lastReplyDate: '30 сен 2022 17:42',
  },
  {
    thread: 'Киса ты с какова горада?',
    pageCount: 2,
    author: 'Злютик Незабутик',
    startDate: '27-09-22',
    replies: '45 ответов',
    lastReplyUser: 'Феррус',
    lastReplyDate: '28 сен 2022 13:02',
  },
]

export const PhorumMainPageContent: FC<PhorumThreadListProps> = ({
  title = 'Форум',
}) => {
  const [isNew, setIsNew] = useState(false)
  const popupElem = useRef() as React.MutableRefObject<HTMLInputElement>;
  return (
    <div className="phorum-wrapper">
      <h3 className="thread-list__section-header">{title}</h3>
      <div className="new-thread-wrapper">
        <div className="new-thread">
          <div
            className="new-thread__link"
            onClick={() => (isNew ? setIsNew(false) : setIsNew(true))}>
            Новая тема
          </div>{' '}
        </div>
      </div>
      <div className="phorum-thread-list">
        <MainListHeader />
        <div className="thread-list__wrapper">
          <ThreadList {...dummyList} />
        </div>
      </div>

      {!!isNew && (
        <Popup
          popupRef={popupElem}
          title="Новая тема"
          buttonText="Создать новую тему"
          onClick={() => console.log('НУ КЛИК')}
          showValidation={false}
          validationText=""
          className="new-thread__popup">
          <Input label="Название темы" />
          <textarea
            className="new-thread__textarea"
            placeholder="Ваше первое сообщение..."></textarea>
        </Popup>
      )}
      {!!isNew && (
        <div className="popup-background" onClick={() => setIsNew(false)}></div>
      )}
    </div>
  )
}
