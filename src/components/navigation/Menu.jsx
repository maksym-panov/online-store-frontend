import s from "../../style/NavigationBar.module.css";
import menuImg from "../../img/menu.png";
import x from "../../img/x.png";
import MenuLinks from "./MenuLinks";
import MenuAdditionalButtons from "./MenuAdditionalButtons";
import { isIOS, isSafari } from "react-device-detect";

export default () => {
  const TI = isSafari || isIOS ? 0 : null;

  return (
    <div className={s.menuContainer}>
      <button className={s.menu} tabIndex={TI}>
        <div className={s.menuButton} tabIndex={TI}>
          <img src={menuImg} alt="menu" className={s.menuIcon} />
        </div>

        <div className={s.menuLinksBackgroundContainer} tabIndex={TI}>
          <MenuLinks />
          <hr className={s.horisontalRulerMenu} />
          <MenuAdditionalButtons />
        </div>
      </button>  
      <button className={s.closeButton}>
        <img src={x} alt="close" className={s.closeIcon}  />
      </button>
    </div>
  );
}