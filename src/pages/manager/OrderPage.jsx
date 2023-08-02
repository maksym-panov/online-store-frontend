import { 
    useEffect,
    useState
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "../../style/Orders.module.css";
import oh from "../../utils/ordersHelper";
import ContentPanel from "../../components/orders/order_page/ContentPanel";
import MetaDataPanel from "../../components/orders/order_page/MetaDataPanel";
import ContactsPanel from "../../components/orders/order_page/ContactsPanel";
import ButtonsPanel from "../../components/orders/order_page/ButtonsPanel";

const OrderPage = (props) => {
    const ctx = {}; 
    ctx.id = props.orderId;
    [ctx.order, ctx.setOrder] = useState({ orderId: ctx.id });
    [ctx.err, ctx.setErr] = useState(null);
    ctx.currentUser = useSelector(state => state.user);
    ctx.navigate = useNavigate();

    const fetchPageOrderCommand = oh.getFetchPageOrderCommand(ctx);

    useEffect(() => { fetchPageOrderCommand() }, []);

    return (
        <div className={s.edOrdCont}>
            <div className={s.edOrdCol}>
                <MetaDataPanel mediator={ ctx } />
                <ContactsPanel mediator={ ctx } />
                {
                    ctx.order.orderProducts &&
                    <ContentPanel mediator={ ctx } />
                }
                <ButtonsPanel mediator={ ctx } />
            </div>
        </div>
    );
}

export default OrderPage;