import { useNavigate } from "react-router-dom";
import s from "../../style/Orders.module.css";
import { MANAGE_ORDERS_PAGE } from "../../utils/constants";

export default (props) => {
    const navigate = useNavigate();
    const o = props.order;
    const m = props.management;

    return (
        <div className={s.ordBod}>
            <div className={s.ordMeta}> 
                <p className={s.text}>Order number: {o.orderId}</p>
                <p className={s.text}>Posted: 
                    {
                        new Date(
                            parseInt(o.postTime)
                        )
                        .toLocaleString("uk-UA")
                    }
                </p>
                <p className={s.text}>Completed: 
                    {
                        o.completeTime 
                        ?
                        new Date(
                            parseInt(o.completeTime)
                        )
                        .toLocaleString("uk-UA")
                        :
                        " - "
                    }
                </p>
                <p 
                    style={ { fontWeight: "bold"} } 
                    className={s.text}
                >
                Status: <span style={ statCol(o.status) }>{o.status}</span>
                </p>

                { 
                    m && 
                    <button 
                        onClick={ 
                            () => navigate(MANAGE_ORDERS_PAGE + "?id=" + o.orderId ) 
                        }
                    >
                        Change
                    </button>
                }
            </div>
            <div className={s.ordProdSect}>
                <h5 className={s.ordProdTitle}>Contents</h5>
                <div className={s.prodLst}>
                    <div className={s.prod}>
                        <p 
                            style=
                            { 
                                { 
                                    fontWeight: "bold" 
                                } 
                            } 
                            className={s.text}
                        >
                        Product name
                        </p>
                        <p 
                            style=
                            { 
                                { 
                                    fontWeight: "bold", 
                                    width: "80px", 
                                    textAlign: "center" 
                                } 
                            } 
                            className={s.text}
                        >
                        Quantity
                        </p>
                    </div>
                    <hr className={s.ruler} />
                    {
                        o.orderProducts.map(op => (
                            <div key={ "op" + op.product?.productId } className={s.prdct}>
                                <p className={s.text}>- {op.product.name}</p>
                                <p 
                                    style=
                                    { 
                                        { 
                                            width: "80px", 
                                            textAlign: "center" 
                                        } 
                                    } 
                                    className={s.text}
                                >
                                {op.quantity}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <hr className={s.ruler} />
                <h4 className={s.total}>Total: ${o.total}</h4>
            </div>
        </div>
    );
}

const statCol = (stat) => {
    const col = { };

    switch (stat) {
        case "POSTED":
            col.color = "grey";
            break;
        case "ACCEPTED":
            col.color = "gold";
            break;
        case "SHIPPING":
            col.color = "orange";
            break;
        case "DELIVERED":
            col.color = "blue";
            break;
        case "COMPLETED":
            col.color = "lightgreen";
            break;
        case "ABOLISHED":
            col.color = "red";
            break;
        default: 
            col.color = "black";
            break;
    }

    return col;
}
