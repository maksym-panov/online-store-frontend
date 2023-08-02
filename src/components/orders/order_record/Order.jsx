import s from "../../../style/Orders.module.css";
import OrderRecordContent from "./OrderRecordContent";
import OrderRecordMeta from "./OrderRecordMeta";

export default (props) => {
    const ctx = props.mediator;
    const order = props.order;

    return (
        <div className={s.ordBod}>
            <OrderRecordMeta order={ order } mediator={ ctx } />
            <OrderRecordContent order={ order } />
        </div>
    );
}


