import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button } from '../../../Button/Button'
import { Input } from '../../../Input/Input'
import { MainListHeader } from '../PhorumMainListHeader/PhorumMainListHeader'
import {
  PhorumThreadListItem,
  ThreadListItemProps,
} from '../PhorumThreadListItem/PhorumThreadListItem'
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

type MakeNewThreadProps = {
  text: string
  author: string
}

function makeNewThread(props: MakeNewThreadProps) {
  const { text, author } = props
  const startDate = new Date().toLocaleDateString('ru')
  dummyList.push({
    thread: text,
    pageCount: 0,
    author: author,
    startDate: startDate,
    replies: '0 ответов',
    lastReplyUser: author,
    lastReplyDate: startDate,
  })
  MakeThreadList()
}

export const ThreadList = () => {
  return (
    <ul className="thread-list__list">
      {dummyList.map((item, index) => (
        <PhorumThreadListItem
          thread={item.thread}
          pageCount={item.pageCount}
          author={item.author}
          startDate={item.startDate}
          replies={item.replies}
          lastReplyUser={item.lastReplyUser}
          lastReplyDate={item.lastReplyDate}
          key={'thread' + index}
        />
      ))}
    </ul>
  )
}

let root: ReactDOM.Root | undefined = undefined

function MakeThreadList() {
root?.unmount();
root = ReactDOM.createRoot(
          document.querySelector('.thread-list__wrapper') as HTMLElement
        );
  root.render(ThreadList());
}

export const PhorumMainPageContent: FC<PhorumThreadListProps> = ({
  title = 'Форум',
}) => {
  const [isNew, setIsNew] = useState(false)
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
          {!!isNew && (
            <>
              <div className="new-thread__input-wrapper">
                <Input />
              </div>
              <div className="new-thread__button-wrapper">
                <Button
                  className="new-thread__button"
                  onClick={() => {
                    makeNewThread({ text: 'тест', author: 'Я' })
                  }}>
                  {'Создать тему'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="phorum-thread-list">
        <MainListHeader />
        <div className="thread-list__wrapper">
          <ThreadList />
        </div>
      </div>
    </div>
  )
}