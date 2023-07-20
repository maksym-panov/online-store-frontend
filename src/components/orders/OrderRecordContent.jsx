import s from "../../style/Orders.module.css";

export default (props) => {
    const o = props.order;

    return (
        <div className={s.ordProdSect}>
            <h5 className={s.ordProdTitle}>Contents</h5>
            <div className={s.prodLst}>
                <div className={s.prdct}>
                    <p style={{ fontWeight: "bold" }} className={s.text}>
                        Product name
                    </p>
                    <p 
                        style={
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
                            <p style={{ width: "80px", textAlign: "center" }} className={s.text}>
                                {op.quantity}
                            </p>
                        </div>
                    ))
                }
            </div>
            <hr className={s.ruler} />
            <h4 className={s.total}>Total: ${o.total}</h4>
        </div>
    );
}