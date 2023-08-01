import { 
    useState, 
    useEffect 
} from "react";
import { CATEGORIES_PAGE } from "../../utils/constants";
import { 
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import ProductsList from "../../components/products/ProductsList";
import s from "../../style/Products.module.css";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { ping } from "../../utils/webHelpers";
import ch from "../../utils/categoriesHelper";

export default () => {
    const ctx = {};
    [ctx.params, ctx.setParams] = useSearchParams();
    [ctx.categArr, ctx.setCategArr] = useState([]);
    [ctx.categ, ctx.setCateg] = useState({});
    ctx.id = ctx.params.get("id");
    ctx.user = useSelector(state => state.user);
    ctx.dispatch = useDispatch();
    ctx.navigate = useNavigate();
    
    const fetchCategoryCommand = ch.getFetchCategoryCommand(ctx);
    const fetchCategoriesCommand = ch.getFetchCategoriesCommand(ctx);

    useEffect(() => {
        ping(ctx.user, ctx.dispatch);

        if (ctx.id) {
            fetchCategoryCommand();
        } else {
            fetchCategoriesCommand();
        }
    }, []);

    if (ctx.id) {
        return (
            <>
                <h2 style={ ch.titleStyle }>Products in category "{ ctx.categ?.name }"</h2>
                <ProductsList categoryId={ ctx.id } />
            </>
        );
    }

    const size = ctx.categArr.length;
    const firstCol = ctx.categArr.slice(0, Math.ceil(size / 2));
    const secondCol = ctx.categArr.slice(Math.ceil(size / 2));

    return (
        <div className={ s.ptContainer }>
            <div className={ s.ptList }>
                <div className={ s.col }>
                    {
                        firstCol.map(pt => (
                            <a 
                                key={ pt.productTypeId }
                                className={ s.link }
                                href={ CATEGORIES_PAGE + "?id=" + pt.productTypeId }
                            >
                            { pt.name }
                            </a>
                        ))
                    }
                </div>
                <div className={ s.col }>
                    {
                        secondCol.map(pt => (
                            <a 
                                key={ pt.productTypeId }
                                className={ s.link }
                                href={ CATEGORIES_PAGE + "?id=" + pt.productTypeId }
                            >
                            { pt.name }
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}