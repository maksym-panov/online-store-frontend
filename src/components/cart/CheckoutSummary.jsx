import s from "../../style/Cart.module.css";
import profiles from "../../style/Profile.module.css";
import { useEffect } from "react";
import ch from "../../utils/checkoutHelper";

export default (props) => {
    const ctx = props.mediator;
    const fetchCommand = ch.getFetchDeliveriesCommand(ctx);
    const checkoutCommand = ch.getDoCheckoutCommand(ctx);

    let total = ch.evalTotal(ctx);

    useEffect(() => { fetchCommand() }, []);

    return (
        <div className={s.checkoutSummary}>
            <label className={profiles.changeDataPiece}>
                <h4 className={profiles.dataHead}>Delivery</h4>
                <select>
                    {
                        ctx.deliveries.map(d => 
                            <option 
                                onClick={ () => ctx.setDeliv(d) } 
                                key={d.deliveryTypeId}
                                value={d.deliveryTypeId}
                            >
                            {d.name}
                            </option>    
                        )
                    }
                </select>
            </label>
            <hr className={s.ruler} />
            <h2 className={s.total}>Total - ${ total }</h2>
            <button 
                onClick={ checkoutCommand }
                className={s.checkoutButton}
            >
            Checkout
            </button>
            {
                ctx.errorState && 
                <p className={`${profiles.validationError} ${s.incorrectData}`}>
                    Incorrect data!
                </p>
            }
        </div>
    );
}