import { 
    useEffect,
    useState
} from "react";
import { 
    BASE64_RESOLVER, 
    ERROR_PAGE, 
    PRODUCTS 
} from "../../utils/constants";
import api from "../../utils/axiosHelper";
import s from "../../style/Products.module.css";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { ping } from "../../utils/webHelpers";
import ProductPageMeta from "../../components/products/ProductPageMeta";

export default (props) => {
    const id = props.id;
    const [p, setP] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct(id, setP, navigate);
    }, [])

    const paragraphs = p.description?.split("\n");

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        ping(user, dispatch);
    }, []);

    return (
        <div className={s.prodPageBack}> 
            <div className={s.prodInfoSect}>
                <div className={s.prodImgCont}>
                    <img className={s.prodImg} src={BASE64_RESOLVER + p.image} />
                </div>
                <ProductPageMeta product={ p } />
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

const fetchProduct = async (id, setP, navigate) => {
    try {
        const p = await api.get(PRODUCTS + "/" + id)
                        .then(resp => resp.data);
        setP(p);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
} 