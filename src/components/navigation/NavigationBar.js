import s from "../../style/NavigationBar.module.css";
import { Logo } from "./Logo";
import { Links } from "./Links";
import { AccountInfo } from "./AccountInfo";
import { Menu } from "./Menu";

function NavigationBar() {
    return (
      <header className={s.headerPrimary}>
        <Logo />
        <Links />
        <AccountInfo />
        <Menu />
      </header>
    );
}

export default NavigationBar;