import s from "../../style/NavigationBar.module.css";
import Logo from "./Logo";
import Links from "./Links";
import AccountInfo from "./AccountInfo";
import Menu from "./Menu";

export default () => {
    return (
      <header className={s.headerPrimary}>
        <Logo />
        <Links />
        <AccountInfo />
        <Menu />
      </header>
    );
}
