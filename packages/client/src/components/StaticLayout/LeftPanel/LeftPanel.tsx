
import { Button } from '../../Button/Button';
import './LeftPanel.scss'

export const LeftPanel = () => {
    return (
          <div className="link-to-game_theme_light">
            <Button className="link-to-game__button" content="" onClick= {
              () => {
                console.log("CLICK");
              } 
            }  /> 
          </div>
      );
}
