import { 
    useState, 
    useEffect 
} from "react";
import s from "../../style/ManagerProducts.module.css";
import { useNavigate } from "react-router-dom";
import { 
    ERROR_PAGE, 
    PRODUCT_CATEGORIES 
} from "../../utils/constants";
import api from "../../utils/axiosHelper";

export default (props) => {
    const categories = props.categories;
    const setCategories = props.setCategories;
    const navigate = useNavigate();

    const [all, setAll] = useState([]);

    useEffect(() => {
        fetchAll(setAll, navigate);
    }, []);

    return (
        <div className={s.catCont}>
            {
                all.map(c => {
                    const checked = categories.find(
                        pres => pres.productTypeId === c.productTypeId
                    );

                    return (
                        <label
                            key={ "categ-" + c.productTypeId } 
                            style={ checked && { backgroundColor: "#2473FF", border: "none" } }
                            className={s.cat}
                        >
                            <p 
                                style={ checked && { color: "white"} }
                                className={s.text}
                            >
                            {c.name}
                            </p>
                            <input 
                                style={ { display: "none" } }
                                type="checkbox" 
                                onChange={ e => 
                                    update(
                                        categories, 
                                        setCategories, 
                                        c, 
                                        e.target.checked
                                    ) 
                                } 
                                checked={ checked }
                            />
                        </label>   
                    ) 
                })
            }
        </div>
    );
}

const fetchAll = async (setAll, navigate) => {
    try {
        const all = await api
            .get(PRODUCT_CATEGORIES)
            .then(resp => resp.data);

        setAll(all);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}

const update = (categories, setCategories, newCateg, checked) => {
    if (checked) {
        setCategories([newCateg, ...categories]);
    } else {
        setCategories(
            categories.filter(
                c => c.productTypeId !== newCateg.productTypeId
            )
        );
    }
}