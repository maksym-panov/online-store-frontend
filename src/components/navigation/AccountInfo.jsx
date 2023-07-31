import { 
  LOGIN_PAGE, 
  CART_PAGE, 
  BASE64_RESOLVER
} from "../../utils/constants";
import s from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import nh from "../../utils/navigationHelper";


const AccountInfo = () => {
  const ctx = {};
  ctx.user = useSelector(state => state.user);
  ctx.products = useSelector(state => state.cart.products);

  let productsInCart = nh.evalProductsInCart(ctx);

  return (
      <div className={s.accountContainer}>
        <Link to={ CART_PAGE } className={`${s.cartButton} ${s.accountButton}`}>
            <div 
              style={ nh.cartImage }
              className={`${s.icon} ${s.cartIcon}`} 
            >
            </div>
            <div className={s.counterStyle} style={ productsInCart ? nh.showStyle : {} }>
              <div>
                {productsInCart}
              </div>
            </div>
            <p className={s.accountText}>Cart</p>
        </Link>
        <Link to={LOGIN_PAGE} className={s.accountButton}>
            <div style={ nh.accountImage(ctx) } className={s.icon}></div>
            <p className={s.accountText}>
              { nh.accountText(ctx) }
            </p>
        </Link>
      </div>
  );
}

export default AccountInfo;