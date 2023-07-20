import s from "../../style/Orders.module.css";
import OrderRecordContent from "./OrderRecordContent";
import OrderRecordMeta from "./OrderRecordMeta";

export default (props) => {
    const o = props.order;
    const m = props.management;

    return (
        <div className={s.ordBod}>
            <OrderRecordMeta order={ o } management={ m } />
            <OrderRecordContent order={ o } />
        </div>
    );
}


