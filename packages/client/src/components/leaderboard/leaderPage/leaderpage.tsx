//import React from 'react'
import { LeftPanel } from '../../static-layout/static-layout'
import { UpperMenu, UserProps } from '../../upper-menu/upper-menu-layout/upper-menu'
import { LeaderItem, LeaderProps } from '../leader/leader'
import './leaderpage.scss'

const dummyLeaders: LeaderProps[] = [
  {
    avatar: '',
    name: 'Сангвиний',
    score: '15 000',
  },
  {
    avatar: '',
    name: 'Хорус',
    score: '13 625',
  },
  {
    avatar: '',
    name: 'Корвус',
    score: '12 848',
  },
  {
    avatar: '',
    name: 'Ночной Призрак',
    score: '9 376',
  },
  {
    avatar: '',
    name: 'ИМПЕРАТОР',
    score: '6 373',
  },
  {
    avatar: '',
    name: 'СиГиЛлИт',
    score: '2 334',
  },
  {
    avatar: '',
    name: 'Демонетка с правого фланга',
    score: '1 432',
  },
]

const dummyUser: UserProps = {
    id: 1,
    first_name: "Phil",
    second_name: "Punxatawny",
    display_name: "",
    login: "phil",
    email: "phil@punxatawny.com",
    phone: "0192837462",
    avatar: "",
  };

export const LeaderPage = (props) => {
  const title = props.title ? props.title : 'Доска почета'
  return (
    <div className="main-wrapper">
      <LeftPanel />
      <UpperMenu {...dummyUser} />
      <div className="leaderboard-wrapper">

        <h3>{title}</h3>
        <div className="leaderboard__top">
          <ul className="leaderboard-top-list">
            {dummyLeaders.slice(0, 3).map((leader, index) => (
              <LeaderItem
                avatar={leader.avatar}
                name={leader.name}
                score={leader.score}
                key={"top" + index}
              />
            ))}
          </ul>
        </div>
        <div className="leaderboard__leaders">
          <ul className="leaderboard-list">
            {dummyLeaders.slice(3, 10).map((leader, index) => (
              <LeaderItem
                avatar={leader.avatar}
                name={leader.name}
                score={leader.score}
                key={"leader" + index}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
