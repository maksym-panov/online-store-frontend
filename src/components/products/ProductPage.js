import { 
    useEffect,
    useState
} from "react";
import { BASE64_RESOLVER, PRODUCTS } from "../../utils/constants";
import { api } from "../../utils/axiosHelper";
import s from "../../style/Products.module.css";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cartSlice";

export const ProductPage = (props) => {
    const id = props.id;
    const [p, setP] = useState({})

    useEffect(() => {
        fetchProduct(id, setP);
    }, [])

    const paragraphs = p.description?.split("\n");
    console.log(paragraphs)

    const stock = p?.stock ? "In stock" : "Out of stock";
    const stockStyle = {
        fontSize: "1.3em",
        color: p?.stock ? "#2473FF" : "black"
    };

    const dispatch = useDispatch();

    const addToCart = () => { 
        dispatch(addProductToCart(
            {
                id: p?.productId,
                stock: p?.stock
            }
        )) 
    };

    return (
        <div className={s.prodPageBack}> 
            <div className={s.prodInfoSect}>
                <div className={s.prodImgCont}>
                    <img className={s.prodImg} src={BASE64_RESOLVER + p.image} />
                </div>
                <div className={s.priceCont}>
                    <div className={s.info}>
                        <h3 className={s.title}>{p.name}</h3>
                        <p style={stockStyle}>{stock}</p>
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
            </div>
            <div className={s.descCont}>
                <h1 className={s.title}>Description</h1>
                <div className={s.desc}>
                    {
                        paragraphs?.map(par => {
                            if (par) {
                                return <p className={s.parag}>{par}</p>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
}

const fetchProduct = async (id, setP) => {
    const p = await api.get(PRODUCTS + "/" + id)
                        .then(resp => resp.data);
    setP(p);
} 