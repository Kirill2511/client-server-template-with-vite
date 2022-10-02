import { MouseEventHandler } from "react";

export type MenuItemProps = {
    text: string,
    link: MouseEventHandler<HTMLLIElement>,
}

export const UpperMenuItem: React.FC<MenuItemProps> = (props) => {
    const { text, link } = props;

    return (
        <li className="menu-list__item" onClick={link}>{text}</li>
    );

}
