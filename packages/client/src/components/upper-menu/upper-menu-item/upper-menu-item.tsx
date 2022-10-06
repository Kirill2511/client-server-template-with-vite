export type MenuItemProps = {
    text: string,
    link: CallableFunction,
}

export const UpperMenuItem = (props) => {
    const { text, link } = props;

return (
    <li className="menu-list__item" onClick={link}>{text}</li>
);

}

