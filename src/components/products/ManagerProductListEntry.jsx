import s from "../../style/ManagerProducts.module.css";
import { MANAGE_PRODUCTS_PAGE } from "../../utils/constants";
import { Link } from "react-router-dom";

export default (props) => {
    const p = props.product;
    return (
        <div className={s.p}>
            <div className={s.idCont}>
                <p className={s.text}>Id: {p.productId}</p> 
            </div>
            <div className={s.nCont}>
                <Link 
                    to={ MANAGE_PRODUCTS_PAGE + "?id=" + p.productId }
                    className={s.text}
                >
                    {p.name}
                </Link> 
            </div>
            <div className={s.metaCont}>
                <p className={s.text}>Price: {" $" + p.price}</p>
                <p className={s.text}>Stock: {p.stock}</p>
            </div>
        </div>
    );
}