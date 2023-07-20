import { useSearchParams } from "react-router-dom";
import { 
    useState,
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
    ORDERS,  
    ORDERS_PER_PAGE,
    API_OFFSET_PARAM,
    API_ENTITIES_PER_PAGE_PARAM,
    API_ORDER_BY_PARAM,
    API_STATUS_PARAM,
    ERROR_PAGE 
} from "../../utils/constants";
import api from "../../utils/axiosHelper";
import s from "../../style/Orders.module.css";
import Order from "./Order";
import Pagination from "../../components/common/Pagination";

export default () => {
    const [searchId, setSearchId] = useState("");
    const [ordBy, setOrdBy] = useState("desc");
    const [stat, setStat] = useState(null);
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();  
    const currentUser = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);

    let page = params.get("page");

    useEffect(() => {
        window.scroll(0, 0);

        if (page == null) {
            page = 1;
        }
        if (page <= 0) {
            setParams({ page: 1});
            page = 1
        }
        
        fetchAll(ordBy, stat, page, setOrders, currentUser.jwt, navigate, setParams);
    }, [page, params, ordBy, stat]);


    return (
        <div className={s.ordCont}>
            <h1 className={s.title}>Placed orders</h1>
            <hr />
            <div className={s.inp}>
                <input 
                    className={s.prompt}
                    onChange={ e => setSearchId(e.target.value) }
                    value={ searchId }
                    type="text" 
                    placeholder="Enter order ID" 
                />
                <button
                    className={s.tColr}  
                    onClick={ () => fetchById(searchId, setOrders, currentUser.jwt, navigate, setParams) }   
                >
                Search
                </button> 
            </div> 
            <div className={s.paramHold}>
                <div className={s.param}>
                    Status
                    <select className={s.sel} defaultValue={ stat } onChange={ e => setStat(e.target.value) }>
                        <option value={ null }></option> 
                        <option value={ "POSTED" }>POSTED</option>
                        <option value={ "ACCEPTED" }>ACCEPTED</option>
                        <option value={ "SHIPPING" }>SHIPPING</option>
                        <option value={ "DELIVERED" }>DELIVERED</option>
                        <option value={ "COMPLETED" }>COMPLETED</option>
                        <option value={ "ABOLISHED" }>ABOLISHED</option>
                    </select>
                </div>
                <div className={s.param}>
                    Post time
                    <select className={s.sel} defaultChecked={ ordBy } onChange={ e => setOrdBy(e.target.value) }>
                        <option value={ "desc" }>From newest to oldest</option>
                        <option value={ "asc" }>From oldest to newest</option>
                    </select>

                </div>
            </div>
            {
                orders?.slice(0, ORDERS_PER_PAGE).map(o => (
                    <Order key={ o.orderId } order={ o } management={ true } />
                ))
            }
            <Pagination 
                current={ page }
                perPage={ ORDERS_PER_PAGE }
                entities={ orders } 
            />
        </div>
    );
}

const fetchById = async (id, setOrders, token, navigate, setParams) => {
    if (!id) {
        fetchAll(null, null, 1, setOrders, token, navigate, setParams);
        return;
    }
    try {
        setOrders([]);
        const result = await api
            .get(
                ORDERS + "/" + id,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);
            
            setOrders([result]);
    } catch(ignored) {}
}

const fetchAll = async (ordBy, stat, page, setOrders, token, navigate, setParams) => {
    try {
        const offset = (page - 1) * ORDERS_PER_PAGE;
        const number = 2 * ORDERS_PER_PAGE + 1;

        const orders = await api
            .get(
                ORDERS + "?" + 
                API_OFFSET_PARAM + offset + "&" + 
                API_ENTITIES_PER_PAGE_PARAM + number + "&" +
                API_ORDER_BY_PARAM + ordBy + 
                (stat ? ("&" + API_STATUS_PARAM + stat) : ""),
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);

        if (orders.length === 0 && page != 1) {
            setParams({ page: 1});
            page = 1;
        }

        setOrders(orders);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}