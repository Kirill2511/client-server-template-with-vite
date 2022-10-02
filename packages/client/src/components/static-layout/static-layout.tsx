import './static-layout.scss'

export const StaticLayout = () => {
  return (
    <div className="static">
      <div className="link-to-game">
        <button id="link-to-game" title="Вернуться к игре" />
      </div>
      <div className="main-wrapper"></div>
    </div>
  );
}

export const LeftPanel = () => {
    return (
          <div className="link-to-game">
            <button className="link-to-game__button" id="link-to-game" title="Вернуться к игре" />
          </div>
      );
}
