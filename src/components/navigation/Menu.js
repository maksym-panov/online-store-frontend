import styles from "../../style/NavigationBar.module.css";
import menu from "../../img/menu.png";
import x from "../../img/x.png";
import { MenuLinks } from "./MenuLinks";
import { MenuAdditionalButtons } from "./MenuAdditionalButtons";
import { isIOS, isSafari } from "react-device-detect";

export function Menu() {
  const TI = isSafari || isIOS ? 0 : null;

  return (
    <div className={styles.menuContainer}>
      <button className={styles.menu} tabIndex={TI}>
        <div className={styles.menuButton} tabIndex={TI}>
          <img src={menu} alt="menu" className={styles.menuIcon} />
        </div>

        <div className={styles.menuLinksBackgroundContainer} tabIndex={TI}>
          <MenuLinks />
          <hr className={styles.horisontalRulerMenu} />
          <MenuAdditionalButtons />
        </div>
      </button>  
      <button className={styles.closeButton}>
        <img src={x} alt="close" className={styles.closeIcon}  />
      </button>
    </div>
  );
}