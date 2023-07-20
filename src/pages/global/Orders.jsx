import { useSearchParams } from "react-router-dom";
import OrderPage from "../manager/OrderPage";
import OrderListByUser from "../../components/orders/OrderListByUser";
import AllOrderList from "../../components/orders/AllOrderList";

export default (props) => {
    const [params, setParams] = useSearchParams();
   
    const userId = props.userId;
    const order = params.get("id");
    const userIdParam = params.get("user");
    
    const isManagement = userIdParam || order || !userId;
    
    if (userId || userIdParam) {
        return (
            <OrderListByUser
                userId={ userId } 
                userIdParam={ userIdParam } 
                isManagement={ isManagement }
            />
        ) 
    }

    if (order) {
        return (
            <OrderPage orderId={ order } />
        );
    }

    return (
        <AllOrderList />
    );
}