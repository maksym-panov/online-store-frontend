import styles from "../../style/NavigationBar.module.css";
import { Logo } from "./Logo";
import { Links } from "./Links";
import { AccountInfo } from "./AccountInfo";
import { Menu } from "./Menu";

function NavigationBar() {
    return (
      <header className={styles.headerPrimary}>
        <Logo />
        <Links />
        <AccountInfo />
        <Menu />
      </header>
    );
}

export default NavigationBar;