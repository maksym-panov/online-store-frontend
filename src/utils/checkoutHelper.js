import { 
  ORDERS,
  ORDER_POSTED_PAGE,
  DELIVERIES,
  ERROR_PAGE
} from "./constants";
import api from "../utils/axiosHelper";


const checkoutHelper = {
  evalTotal: (ctx) => {
    return ctx.products
        .map(p => p.quantity * p.price)
        .reduce((a, c) => a + c, 0)
        .toFixed(2);
  },

  getFetchDeliveriesCommand: (ctx) => async () => {
      try {
          const d = await api
            .get(DELIVERIES)
            .then(resp => resp.data);
          
          ctx.setDeliv(d[0]);
          ctx.setDeliveries(d);
      } catch(error) {
          ctx.navigate(ERROR_PAGE);
      }
  },

  getDoCheckoutCommand: (ctx) => async () => {
    const newOrder = {};

    const orderProducts = 
        ctx.products.map(p => (
            {
                product: {
                    productId: p.id
                },
                quantity: p.quantity
            }
        ))

    newOrder.deliveryType = ctx.deliv;
    newOrder.orderProducts = orderProducts;
   
    let newOrderId;

    try {
        if (!ctx.user.userId || !ctx.user.jwt) {
            newOrder.unregCust = ctx.customer;
            newOrderId = await api
                .post(
                    ORDERS,
                    newOrder
                )
                .then(resp => resp.data);
        } else {
            newOrder.user = ctx.user;
            newOrderId = await api
                .post(
                    ORDERS,
                    newOrder,
                    {
                        headers: {
                            "Authorization": ctx.user.jwt
                        }
                    }
                )
                .then(resp => resp.data);
        }
    } catch(error) {
        
        if (error.response?.data) {
            ctx.setErr(error.response.data);
            ctx.setErrorState(true);
            return;
        }

        ctx.navigate(ERROR_PAGE);
        return;
    }

    ctx.navigate(ORDER_POSTED_PAGE + "?id=" + newOrderId)
    return;
  }
}

export default checkoutHelper;