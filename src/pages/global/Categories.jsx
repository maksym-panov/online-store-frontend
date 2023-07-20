import { 
    useState, 
    useEffect 
} from "react";
import { 
    CATEGORIES_PAGE, 
    ERROR_PAGE, 
    PRODUCT_CATEGORIES 
} from "../../utils/constants";
import { 
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import api from "../../utils/axiosHelper";
import ProductsList from "../../components/products/ProductsList";
import s from "../../style/Products.module.css";
import {
    useSelector,
    useDispatch
} from "react-redux";
import { setUser } from "../../features/auth/userSlice";


export default () => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [categArr, setCategArr] = useState([]);
    const [categ, setCateg] = useState({});

    const id = params.get("id");

    const titleStyle = {
        backgroundColor: "#e6f4f1",
        margin: 0,
        textAlign: "center",
        paddingTop: "30px"
    }

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const ping = async () => {
        if (!user.userId) {
            return;
        }
        
        try {
            const valid = await api.post(
                "/ping/" + user.userId,
                user.jwt.substring(7),
                {
                    headers: {
                        "Authorization": user.jwt
                    }
                }
            );

            if (!valid) {
                dispatch(setUser({}));
            }
        } catch(error) {
            dispatch(setUser({}));
        }
    }

    useEffect(() => {
        ping();

        if (id) {
            fetchCateg(id, setCateg, navigate)
        } else {
            fetchCategArr(setCategArr, navigate);
        }
    }, []);

    if (id) {
        return (
            <>
                <h2 style={titleStyle}>Products in category "{categ?.name}"</h2>
                <ProductsList categoryId={id} />
            </>
        );
    }

    const size = categArr.length;
    const firstCol = categArr.slice(0, Math.ceil(size / 2));
    const secondCol = categArr.slice(Math.ceil(size / 2));

    return (
        <div className={s.ptContainer}>
            <div className={s.ptList}>
                <div className={s.col}>
                    {
                        firstCol.map(pt => (
                            <a 
                                key={pt.productTypeId}
                                className={s.link}
                                href={CATEGORIES_PAGE + "?id=" + pt.productTypeId}
                            >
                            {pt.name}
                            </a>
                        ))
                    }
                </div>
                <div className={s.col}>
                    {
                        secondCol.map(pt => (
                            <a 
                                key={pt.productTypeId}
                                className={s.link}
                                href={CATEGORIES_PAGE + "?id=" + pt.productTypeId}
                            >
                            {pt.name}
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

async function fetchCategArr(setCategArr, navigate) {
    try {
        const categArr = await api
            .get(PRODUCT_CATEGORIES)
            .then(resp => resp.data);
        setCategArr(categArr);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}

async function fetchCateg(id, setCateg, navigate) {
    try {
        const categ = await api
            .get(PRODUCT_CATEGORIES + "/" + id)
            .then(resp => resp.data);
        setCateg(categ);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
   
}