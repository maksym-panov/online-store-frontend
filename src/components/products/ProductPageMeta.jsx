import { addProductToCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import s from "../../style/Products.module.css";
import { Link } from "react-router-dom";
import { CATEGORIES_PAGE } from "../../utils/constants";

export default (props) => {
    const p = props.product;
    const dispatch = useDispatch();

    const stock = p?.stock ? "In stock" : "Out of stock";
    const stockStyle = {
        fontSize: "1.3em",
        color: p?.stock ? "#2473FF" : "black"
    };


    const addToCart = () => { 
        dispatch(addProductToCart(
            {
                id: p?.productId,
                stock: p?.stock
            }
        )) 
    };

    return (
        <div className={s.priceCont}>
            <div className={s.info}>
                <h3 className={s.title}>{p.name}</h3>
                <p style={stockStyle}>{stock}</p>
                <div className={s.categCont}>
                    {
                        p?.productTypes?.map(pt => (
                            <Link 
                                key={pt.productTypeId}
                                className={s.categLink}
                                to={CATEGORIES_PAGE + "?id=" + pt.productTypeId}>
                                <p className={s.categ}>{pt.name}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className={s.toCartButton}>
                <p className={s.price}>${p.price?.toFixed(2)}</p>
                <button
                    onClick={ addToCart } 
                    className={s.descriptionPanelButton}
                >
                Add to cart
                </button>
            </div>
        </div>
    );
}