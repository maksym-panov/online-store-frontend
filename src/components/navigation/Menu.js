import styles from "../../style/NavigationBar.module.css";
import menu from "../../img/menu.png";
import x from "../../img/x.png";
import { MenuLinks } from "./MenuLinks";
import { MenuAdditionalButtons } from "./MenuAdditionalButtons";

export function Menu() {
    return (
        <div className={styles.menuContainer}>
          <button className={styles.menu}>
            <div className={styles.menuButton}>
              <img src={menu} alt="menu" className={styles.menuIcon} />
            </div>

            <div className={styles.menuLinksBackgroundContainer}>
              <MenuLinks />
              <hr className={styles.horisontalRulerMenu} />
              <MenuAdditionalButtons />
            </div>
          </button>  
          <button className={styles.closeButton}>
                <img src={x} alt="close" className={styles.closeIcon} />
          </button>
        </div>
    );
}