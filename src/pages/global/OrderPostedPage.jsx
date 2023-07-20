import { 
    Link, 
    useSearchParams 
} from "react-router-dom";
import success from "../../img/success.png";
import s from "../../style/Cart.module.css";
import { EMPTY_PAGE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cartSlice";

export default () => {
    const [params, setParams] = useSearchParams();
    const id = params.get("id");

    const dispatch = useDispatch();
    dispatch(clearCart());

    return (
        <div className={s.sCont}>
            <div className={s.sHold}>
                <div
                    className={s.sImg}
                    style={{ backgroundImage: `url(${success})`}} 
                ></div>
                <h2 className={s.sTitle}>Order №{id} has been successfully posted!</h2>
                <Link className={s.lnk} to={ EMPTY_PAGE }>Continue shopping</Link>
            </div>
        </div>
    );
}