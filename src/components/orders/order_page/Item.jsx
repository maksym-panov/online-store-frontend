import s from "../../../style/Orders.module.css";
import oh from "../../../utils/ordersHelper";

export default (props) => {
    const ctx = props.mediator;
    const item = ctx.items.find(
        i => i.product.productId === props.id
    );

    const incrementCommand = oh.getIncrementCommand(item, ctx);
    const decrementCommand = oh.getDecrementCommand(item, ctx);
    const removeCommand = oh.getRemoveCommand(item, ctx);

    return (
        <div className={s.i}>
            <h5 className={s.itTCont}>{ item.product.name }</h5>
            <div className={s.ordItQ}>
                { 
                    !ctx.disabled && 
                    <button 
                        className={`${s.tColr} ${s.btn}`} 
                        onClick={ decrementCommand }
                    >
                    -
                    </button> 
                }
                <h3>{ item.quantity }</h3> 
                { 
                    !ctx.disabled && 
                    <button 
                        className={`${s.tColr} ${s.btn}`} 
                        onClick={ incrementCommand }
                    >
                    +
                    </button>
                }
                { 
                    !ctx.disabled && 
                    <button 
                        className={`${s.tColr} ${s.btn}`} 
                        onClick={ removeCommand }
                    >
                    X
                    </button> 
                }
            </div>
        </div>
    );
}
