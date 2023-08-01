import { 
  CHECKOUT_PAGE,
  ERROR_PAGE,
  PRODUCTS
} from "./constants";
import { 
  setPrice,
  incrementQuantity,
  decrementQuantity,
  removeProduct
} from "../features/cartSlice";
import api from "../utils/axiosHelper";

const cartHelper = {
  evalTotal: (ctx) => {
    if (ctx.products.length === 0) {
        return 0;
    }

    const total = ctx.products
        .map(p => p.quantity * p.price)
        .reduce((a, c) => a + c, 0)
    
    return Math.round(total * 100) / 100;
  },

  getCheckoutCommand: (ctx) => () => {
    if (!(ctx.products.length === 0)) {
      ctx.navigate(CHECKOUT_PAGE);
    } else {
      ctx.setErr(true);
    }
  },

  getFetchProductCommand: (id, setProduct, ctx) => async () => {
      try {
          const result = await api
              .get(PRODUCTS + "/" + id)
              .then(resp => resp.data);
          
          setProduct(result);
          ctx.dispatch(setPrice({ id: id, price: result.price }));
      } catch(error) {
          ctx.navigate(ERROR_PAGE);
      }
  },

  getIncrCommand: (product, ctx) => () => 
    ctx.dispatch(incrementQuantity(
      { 
        id: product.productId, 
        stock: product.stock 
      }
    )
  ),

  getDecrCommand: (product, ctx) => () => 
    ctx.dispatch(decrementQuantity(product.productId)),
  
  getRemoveCommand: (product, ctx) => () => 
    ctx.dispatch(removeProduct(product.productId))

}

export default cartHelper;