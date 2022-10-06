import React from "react";
import './phorum-main-list-header.scss';

interface MainListHeaderProps {
    threadHeader?: string,
    repliesHeader?: string,
    lastReplyHeader?: string,

}

export const MainListHeader: React.FC<MainListHeaderProps> = ({
    threadHeader = "Тема",
    repliesHeader = "Ответов",
    lastReplyHeader = "Последний ответ",
}) => {

    return (
        <div className="phorum-header-wrapper">
        <div className="thread__header">{threadHeader}</div>
        <div className="replies_header">{repliesHeader}</div>
        <div className="last-reply_header">{lastReplyHeader}</div>
      </div>
    );
}
