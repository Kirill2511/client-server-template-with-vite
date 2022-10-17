import React, { FC } from 'react'
import { PageCounter } from '../../__PageCount/PhorumPageCount'
import './PhorumThreadListItem.scss'

export interface ThreadListItemProps {
  thread: string
  author: string
  startDate: string
  pageCount: number
  replies: string
  lastReplyUser: string
  lastReplyDate: string
}

export const PhorumThreadListItem: FC<ThreadListItemProps> = props => {
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
    <li className="thread-list__item">
      <div className="thread">
        <div className="thread__thread">
          <span className="thread__text">{thread}</span>{' '}
          <PageCounter pages = {pageCount} />
        </div>
        <div className="thread__info">
          {author} {startDate}
        </div>
      </div>
      <div className="replies">{replies}</div>
      <div className="last-reply">
        <div className='last-reply__user'>{lastReplyUser}</div>
        <div className='last-reply__date'>{lastReplyDate}</div>
      </div>
    </li>
  )
}
