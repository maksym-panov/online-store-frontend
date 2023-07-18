import { 
    useEffect, 
    useState 
} from "react";
import { api } from "../../utils/axiosHelper";
import { 
    PRODUCT_CATEGORIES, 
    ERROR_PAGE, 
    CATEGORIES_PAGE
} from "../../utils/constants";
import { 
    useNavigate,
    Link
} from "react-router-dom";
import s from "../../style/DeliveriesCategories.module.css";
import { useSelector } from "react-redux";

export default (props) => {
    const isAdmin = props.isAdmin;
    
    const user = useSelector(state => state.user);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories(setCategories, navigate);
    }, []);

    return (
        <div className={s.cont}>
            <div className={s.col}>
                <div className={s.newDCont}>
                    <h4 className={s.title}>Add new categories</h4>
                    <label className={s.lab}>
                        { err && <p className={s.validationError}>{ err.name }</p> }
                        Name
                        <input 
                            type="text"
                            value={ name }
                            onChange={ e => setName(e.target.value) } 
                        />
                    </label>
                    { err?.general && <p className={s.validationError}>{ err.general }</p> }
                    <button 
                        className={s.btnP}
                        onClick={ 
                            () => createCategory(name, user.jwt, setErr) 
                        }
                    >
                    Add
                    </button>
                    <button
                        onClick={ () => window.history.back() }
                        className={s.btnS} 
                    >
                    Back
                    </button>
                </div>
                <h4 className={s.title}>Existing categories</h4>
                <div className={s.list}>
                    {
                        categories?.map(c => 
                            <div  
                                className={s.ent}
                            >
                                <Link 
                                    to={ CATEGORIES_PAGE + "?id=" + c.productTypeId } 
                                    className={s.iCont}
                                >
                                    <p className={s.text}>Id: { c.productTypeId }</p>
                                </Link>
                                <Link 
                                    to={ CATEGORIES_PAGE + "?id=" + c.productTypeId }
                                    className={s.tCont}
                                >
                                    <p className={s.text}>{ c.name }</p>
                                </Link>
                                {
                                    isAdmin &&
                                    <div 
                                        onClick={ () => remove(c.productTypeId, user.jwt, navigate) }
                                        className={s.delCont}
                                    >
                                        <p className={s.text}>X</p>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
                 
            </div>
        </div>
    );
}

const fetchCategories = async (setCategories, navigate) => {
    try {
        const categories = await api
            .get(PRODUCT_CATEGORIES)
            .then(resp => resp.data);
        
            setCategories(categories);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}

const createCategory = async (name, token, setErr) => {
    try {
        await api.post(
            PRODUCT_CATEGORIES, 
            { 
                name: name 
            }, 
            {
                headers: {
                    "Authorization": token
                }
            }
        );

        window.location.reload(false);
    } catch(error) {
        if (error.response.data) {
            setErr(error.response.data);
            return;
        } 
        
        setErr({ general: "Something went wrong" });
    }
}

const remove = async (id, token, navigate) => {
    try {
        await api
            .delete(
                PRODUCT_CATEGORIES + "/" + id,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )

        window.location.reload(false);
    } catch {
        navigate(ERROR_PAGE);
    }
}