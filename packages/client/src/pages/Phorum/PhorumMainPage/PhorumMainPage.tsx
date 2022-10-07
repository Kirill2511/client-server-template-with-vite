import React from 'react'
import { MainListHeader } from '../../../components/phorum/PhorumMainListHeader/PhorumMainListHeader';
import { PhorumThreadList } from '../../../components/phorum/PhorumThreadList/PhorumThreadList';

import { PhorumThreadListItem, ThreadListItemProps } from '../../../components/phorum/PhorumThreadListItem/PhorumThreadListItem';
import { LeftPanel, StaticLayout } from '../../../components/StaticLayout/StaticLayout';
import { UpperMenu } from '../../../components/UpperMenu/UpperMenu/UpperMenu';

import './PhorumMainPage.scss';

// const dummyList: ThreadListItemProps[] = [
//   {
//   thread: "Как вы ставите палку - горизонтально или вертикально?",
//   author: "Душка Фулгрим!!",
//   startDate: "28-09-22",
//   pageCount: 13,
//   replies: "237 ответов",
//   lastReplyUser: "Сангвиний",
//   lastReplyDate: "30 сен 2022 18:53"
// },
// {
//   thread: "На какой планете вас нашли!!!",
//   pageCount: 5,
//   author: "Фабиуссс",
//   startDate: "26-09-22",
//   replies: "45 ответов",
//   lastReplyUser: "Перт Железная Башка",
//   lastReplyDate: "30 сен 2022 17:42"
// },
// {
//   thread: "Киса ты с какова горада?",
//   pageCount: 2,
//   author: "Злютик Незабутик",
//   startDate: "27-09-22",
//   replies: "45 ответов",
//   lastReplyUser: "Феррус",
//   lastReplyDate: "28 сен 2022 13:02"
// },
// ]

interface PhorumPageProps {
    threadHeader?: string,
    repliesHeader?: string,
    lastReplyHeader?: string,

}

// function makeNewThread(text: string, author: string) {
//   //const list = document.querySelector(".phorum-thread-list");
//   //list.appendChild(  
//     const date = new Date();
//     const today = JSON.stringify(date);
//     const startDate = today.slice(0, 10);
//     const index = document.getElementsByClassName("phorum-threadlist__item").length;

//   return (
//   <PhorumThreadListItem 
//     thread={text} 
//     pageCount={0} 
//     author={author} 
//     startDate={startDate} 
//     replies={"0 ответов"} 
//     lastReplyUser={author} 
//     lastReplyDate={startDate} 
//     key={"thread" + index} />);
// }




export const PhorumMainPage: React.FC<PhorumPageProps> = () => {

  return (
    <StaticLayout><PhorumThreadList /></StaticLayout>
    
  )
}
