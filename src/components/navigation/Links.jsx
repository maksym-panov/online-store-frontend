import { 
  CATEGORIES_PAGE, 
  DELIVERY_PAGE, 
  ABOUT_PAGE, 
  CONTACTS_PAGE, 
  EMPTY_PAGE 
} from "../../utils/constants";
import s from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";

const Links = () => {
    return (
        <div className={s.linksContainer}>
          <Link className={`${s.headerLink} ${s.linkContainer}`} to={EMPTY_PAGE}>Products</Link>
          <Link className={`${s.headerLink} ${s.linkContainer}`} to={CATEGORIES_PAGE}>Categories</Link>
          <Link className={`${s.headerLink} ${s.linkContainer}`} to={DELIVERY_PAGE}>Delivery</Link>
          <Link className={`${s.headerLink} ${s.linkContainer}`} to={CONTACTS_PAGE}>Contacts</Link>
          <Link className={`${s.headerLink} ${s.linkContainer}`} to={ABOUT_PAGE}>About</Link>
        </div>
    );
}

export default Links;