import { useEffect } from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";
import { ping } from "../../utils/webHelpers";
import iph from "../../utils/infoPagesHelper";

export default () => {
    const text = "1. General Information\nAll orders are subject to product availability. If an item is not in stock at the time you place your order, we will notify you and refund you the total amount of your order, using the original method of payment. \n2. Delivery Location\nItems offered on our website are only available for delivery to addresses in [•]. [We also accept orders from international customers who are shipping to addresses in [•] only.] Any shipments outside of [•] are not available at this time.\n3. Delivery Time\nAn estimated delivery time will be provided to you once your order is placed. Delivery times are estimates and commence from the date of shipping, rather than the date of order. Delivery times are to be used as a guide only and are subject to the acceptance and approval of your order.\nUnless there are exceptional circumstances, we make every effort to fulfill your order within [15] business days of the date of your order. Business day mean Monday to Friday, except holidays.\nPlease note we do not ship on [Sundays].\nDate of delivery may vary due to carrier shipping practices, delivery location, method of delivery, and the items ordered. Products may also be delivered in separate shipments.\n4. Delivery Instructions\n[You can provide special delivery instructions on the check-out page of our website.]\n5. Shipping Costs\nShipping costs are based on the weight of your order and the delivery method. To find out how much your order will cost, simple add the items you would like to purchase to your cart, and proceed to the checkout page. Once at the checkout screen, shipping charges will be displayed.\nAdditional shipping charges may apply to remote areas or for large or heavy items. You will be advised of any charges on the checkout page.\nSales tax is charged according to the province or territory to which the item is shipped.\n6. Damaged Items in Transport \nIf there is any damage to the packaging on delivery, contact us immediately at [•].\n7. Questions\nIf you have any questions about the delivery and shipment or your order, please contact us at [•]."
    const paragraphs = text.split("\n");

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        ping(user, dispatch);
    }, []);

    return (
        <div style={ iph.bodyS }>
            <div style={ iph.contS }>
                <h1 style={ iph.title }>Delivery Policy</h1>
                <hr />
                {
                    paragraphs.map((p, idx) => {
                        if (p !== "") {
                            return (
                                <div key={idx}>
                                    <p style={ iph.textS }>{p}</p>
                                    <br />
                                </div>
                            );
                        }
                    })
                }
            </div>
        </div>
    );
}