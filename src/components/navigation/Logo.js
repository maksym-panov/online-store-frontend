import styles from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import { EMPTY_PAGE } from "../../utils/constants";
import logo from "../../img/raccoon.png";

export function Logo() {
    return (
        <div className={styles.logoContainer}>
          <Link className={styles.logoLink} to={ EMPTY_PAGE }>
            <img src={logo} alt="shopping" className={styles.logoIcon} />
            <span className={styles.logoPrimary}>
              Raccoon's
            </span>
          </Link>
        </div>
    );
}

