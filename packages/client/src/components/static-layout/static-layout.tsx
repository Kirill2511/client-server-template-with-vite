import { Button } from '../Button/Button';
import './static-layout.scss'

export const LeftPanel = () => {
    return (
          <div className="link-to-game">
            <Button className="link-to-game__button" content="" onClick= {
              () => {
                console.log("CLICK");
              } 
            }  /> 
          </div>
      );
}
