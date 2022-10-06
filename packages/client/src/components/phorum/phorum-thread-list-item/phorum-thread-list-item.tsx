import React from 'react'
import { PageCounter } from '../phorum-page-count/phorum-page-count'
import './phorum-thread-list-item.scss'

export interface ThreadListItemProps {
  thread: string
  author: string
  startDate: string
  pageCount: number
  replies: string
  lastReplyUser: string
  lastReplyDate: string
}

export const PhorumThreadListItem: React.FC<ThreadListItemProps> = props => {
  const {
    thread,
    pageCount,
    replies,
    lastReplyUser,
    lastReplyDate,
    author,
    startDate,
  } = props
  return (
    <li className="phorum-threadlist__item">
      <div className="thread">
        <div className="thread__thread">
          <span className="thread__header">{thread}</span>{' '}
          <PageCounter pages = {pageCount} />
        </div>
        <div className="thread__info">
          {author} {startDate}
        </div>
      </div>
      <div className="replies">{replies}</div>
      <div className="last-reply">
        {lastReplyUser}
        {lastReplyDate}
      </div>
    </li>
  )
}
