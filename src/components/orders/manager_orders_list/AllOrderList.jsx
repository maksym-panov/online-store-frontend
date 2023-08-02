import { useSearchParams } from "react-router-dom";
import { 
    useState,
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ORDERS_PER_PAGE } from "../../../utils/constants";
import s from "../../../style/Orders.module.css";
import Order from "../order_record/Order";
import Pagination from "../../common/Pagination";
import oh from "../../../utils/ordersHelper";
import OrdersSearchParameters from "./OrdersSearchParameters";
import SearchOrderPrompt from "./SearchOrderPrompt";

export default () => {
    const ctx = {};
    [ctx.searchId, ctx.setSearchId] = useState("");
    [ctx.ordBy, ctx.setOrdBy] = useState("desc");
    [ctx.stat, ctx.setStat] = useState(null);
    ctx.navigate = useNavigate();
    [ctx.params, ctx.setParams] = useSearchParams();  
    ctx.currentUser = useSelector(state => state.user);
    [ctx.orders, ctx.setOrders] = useState([]);
    ctx.page = ctx.params.get("page");
    ctx.isManagement = true;
    
    const fetchAllOrdersCommand = oh.getFetchAllOrdersCommand(ctx);

    useEffect(() => {
        if (ctx.page == null) {
            ctx.page = 1;
            if (ctx.orders.length)
                return;
        }
        if (ctx.page <= 0) {
            ctx.setParams({ page: 1});
            ctx.page = 1
        }
       
        fetchAllOrdersCommand();
    }, [ctx.page, ctx.params]);

    useEffect(() => {
        fetchAllOrdersCommand();
    }, [ctx.ordBy, ctx.stat]);

    return (
        <div className={s.ordCont}>
            <h1 className={s.title}>Placed orders</h1>
            <hr />
            <SearchOrderPrompt mediator={ ctx } />
            <OrdersSearchParameters mediator={ ctx } />
            {
                ctx.orders?.slice(0, ORDERS_PER_PAGE).map(o => (
                    <Order key={ o.orderId } order={ o } mediator={ ctx }  />
                ))
            }
            <Pagination 
                current={ ctx.page }
                perPage={ ORDERS_PER_PAGE }
                entities={ ctx.orders } 
            />
        </div>
    );
}