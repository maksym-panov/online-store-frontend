import { useSearchParams } from "react-router-dom";
import OrderPage from "../manager/OrderPage";
import OrderListByUser from "../../components/orders/OrderListByUser";
import AllOrderList from "../../components/orders/manager_orders_list/AllOrderList";

export default (props) => {
    const ctx = {}; 
    [ctx.params, ctx.setParams] = useSearchParams();
    ctx.userId = props.userId;
    ctx.order = ctx.params.get("id");
    ctx.userIdParam = ctx.params.get("user");
    ctx.isManagement = ctx.userIdParam || ctx.order || !ctx.userId;
    
    if (ctx.userId || ctx.userIdParam) {
        return <OrderListByUser mediator={ ctx } />;
    }

    if (ctx.order) {
        return (
            <OrderPage orderId={ ctx.order } />
        );
    }

    return (
        <AllOrderList />
    );
}