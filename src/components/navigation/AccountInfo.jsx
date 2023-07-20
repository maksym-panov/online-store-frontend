import { 
  LOGIN_PAGE, 
  CART_PAGE, 
  BASE64_RESOLVER
} from "../../utils/constants";
import s from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import account from "../../img/account.png";
import cart from "../../img/cart.png";
import { useSelector } from "react-redux";

export default () => {
  const user = useSelector(state => state.user);
  const products = useSelector(state => state.cart.products);

  const evalProductsInCart = () => {
    let count = 0;
    products.forEach(p => {
        count += p.quantity;
    });
    return count;
  }

  let productsInCart = evalProductsInCart();
  let font = 0.8;

  const showStyle = {
    display: "flex",
    fontSize: `${font}rem`
  }

  return (
      <div className={s.accountContainer}>
        <Link to={CART_PAGE} className={`${s.cartButton} ${s.accountButton}`}>
            <div 
              style={{
                backgroundImage: `url(${cart})`
              }}
              className={`${s.icon} ${s.cartIcon}`} 
            >
            </div>
            <div className={s.counterStyle} style={productsInCart ? showStyle : {}}>
              <div>
                {productsInCart}
              </div>
            </div>
            <p className={s.accountText}>Cart</p>
        </Link>
        <Link to={LOGIN_PAGE} className={s.accountButton}>
            <div style=
              {
                user && user.image ?
                { backgroundImage: `url("${ BASE64_RESOLVER + user.image }")` }
                :
                { backgroundImage: `url(${account})` }
              }
              className={s.icon} 
            ></div>
            <p className={s.accountText}>
              {
                user && user.personalInfo && user.personalInfo.firstname ? 
                user.personalInfo.firstname : 
                "Account"
              }
            </p>
        </Link>
      </div>
  );
}