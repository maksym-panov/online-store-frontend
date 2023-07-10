import s from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import { EMPTY_PAGE } from "../../utils/constants";
import logo from "../../img/raccoon.png";

export function Logo() {
    return (
        <div className={s.logoContainer}>
          <Link className={s.logoLink} to={ EMPTY_PAGE }>
            <img src={logo} alt="shopping" className={s.logoIcon} />
            <span className={s.logoPrimary}>
              Raccoon's
            </span>
          </Link>
        </div>
    );
}

