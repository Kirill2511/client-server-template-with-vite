import React, { MouseEventHandler } from "react";

export type MenuItemProps = {
    text: string,
    link: MouseEventHandler<HTMLLIElement>,
    title?: string
}

export const UpperMenuItem: React.FC<MenuItemProps> = (props) => {
    const { text, link, title } = props;

return (
    <li className="menu-list__item" onClick={link} title={title ? title : text}>{text}</li>
);

}

