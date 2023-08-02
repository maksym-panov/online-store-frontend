import {
    MANAGER_PAGE,
    ORDERS,
    USERS,
    ORDERS_PER_PAGE,
    API_OFFSET_PARAM,
    API_ENTITIES_PER_PAGE_PARAM,
    API_ORDER_BY_PARAM,
    API_STATUS_PARAM,
    ERROR_PAGE,
    UNREGISTERED,
    DELIVERIES,
    PRODUCTS,
    API_NAME_PARAM
} from "../utils/constants";
import api from "../utils/axiosHelper";

const ordersHelper = {
  title: (ctx) => 
    ctx.userIdParam ? 
    "Orders, posted by user #" + ctx.userIdParam + 
    ` (${ctx.fname ? ctx.fname : ""} ${ctx.lname ? ctx.lname : ""}, 
    ${ctx.phone ? "+38" + ctx.phone : ""})` 
    : "Posted orders",
  
  getFetchUserCommand: (ctx) => async () => {
    try {
      const user = await api
        .get(
          USERS + "/" + ctx.userIdParam,
          {
            headers: {
                "Authorization": ctx.currentUser.jwt
            }
          }
        )
        .then(resp => resp.data)

      ctx.setOrdersOwner(user);
    } catch(error) {
      ctx.navigate(MANAGER_PAGE);
    }
  },

  getFetchOrdersCommand: (ctx) => async () => {
      try {
          const userId = ctx.userId ? ctx.userId : ctx.userIdParam;

          const orders = await api
              .get(
                  USERS + "/" + userId + ORDERS,
                  {
                      headers: {
                          "Authorization": ctx.currentUser.jwt
                      }
                  }
              )
              .then(resp => resp.data);

          ctx.setOrders(orders);
      } catch(error) {
          ctx.navigate(MANAGER_PAGE);
      }
  },

  getFetchAllOrdersCommand: (ctx) => async () => {
    try {
      const offset = (ctx.page - 1) * ORDERS_PER_PAGE;
      const number = 2 * ORDERS_PER_PAGE + 1;

      const orders = await api
        .get(
          ORDERS + "?" + 
          API_OFFSET_PARAM + offset + "&" + 
          API_ENTITIES_PER_PAGE_PARAM + number + "&" +
          API_ORDER_BY_PARAM + ctx.ordBy + 
          (ctx.stat ? ("&" + API_STATUS_PARAM + ctx.stat) : ""),
          {
            headers: {
              "Authorization": ctx.currentUser.jwt 
            }
          }
        )
        .then(resp => resp.data);

      if (orders.length === 0 && ctx.page != 1) {
        ctx.setParams({ page: 1});
      }

      ctx.setOrders(orders);
    } catch(error) {
        ctx.navigate(ERROR_PAGE);
    }
  },

  getFetchOrderListedCommand: (ctx) => async (id) => {
    if (!id) {
      const fetchAllOrdersCommand = ordersHelper.getFetchAllOrdersCommand(ctx);
      fetchAllOrdersCommand();
      return;
    }

    try {
      ctx.setOrders([]);
      const result = await api
        .get(
          ORDERS + "/" + id,
          {
            headers: {
              "Authorization": ctx.currentUser.jwt
            }
          }
        )
        .then(resp => resp.data);
       
        ctx.setOrders([result]);
        ctx.setParams({});
    } catch {}
  },

  getFetchPageOrderCommand: (ctx) => async () => {
    try {
      const order = await api
      .get(
        ORDERS + "/" + ctx.id,
        {
          headers: {
            "Authorization": ctx.currentUser.jwt
          }
        }
      )
      .then(resp => resp.data);
  
      ctx.setOrder(order);
    } catch(error) {
      ctx.navigate(MANAGER_PAGE);
    }
  },

  getFindProductsByNameCommand: (ctx) => async () => {
    ctx.setProducts([]);
    if (!ctx.prodPrompt) { return; }

    try {
      const products = await api
        .get(PRODUCTS + "?" + API_NAME_PARAM + ctx.prodPrompt)  
        .then(resp => resp.data);
    
      if (!isNaN(ctx.prodPrompt)) {
        try {
          const prodById = await api
            .get(PRODUCTS + "/" + ctx.prodPrompt)
            .then(resp => resp.data);
          products.unshift(prodById);
        } catch(ignored) {}
      } 
      ctx.setProducts(products);
    } catch {}
  },

  getAddItemToOrderCommand: (ctx) => (p) => {
    ctx.setErr(null);
    try {
      const curItem = ctx.items.find(
        i => i.product.productId === p.productId
      );
        
      if (p.stock <= 0) {
        ctx.setErr({ order: "Not enough products to add" });
        return;
      }

      ctx.order.total += p.price;

      if (!curItem) { 
        --p.stock;
        ctx.setProducts([...ctx.products]);
        
        const newItem = {
          product: p,
          quantity: 1
        };
        ctx.setItems([newItem, ...ctx.items]);
        return;
      }

      ++curItem.quantity; 
      --curItem.product.stock;
      ctx.setItems([...ctx.items]);
    } catch(ignored) {}
  },

  getUpdateCommand: (ctx) => () => {
    ctx.setItems([...ctx.items]);
  },

  getIncrementCommand: (item, ctx) => () => {
    ctx.setErr(null);
    if (item.product.stock <= 0) {
      ctx.setErr({ order: "Not enough products to add" });
      return;
    }

    ctx.order.total += item.product.price;

    --item.product.stock;
    ++item.quantity;

    const updateCommand = ordersHelper.getUpdateCommand(ctx);
    updateCommand();
  },

  getDecrementCommand: (item, ctx) => () => {
      ctx.setErr(null);
      if (item.quantity <= 1) {
        const removeCommand = ordersHelper.getRemoveCommand(item, ctx);
        removeCommand();
        return;
      }

      ctx.order.total -= item.product.price;

      ++item.product.stock;
      --item.quantity;
 
      const updateCommand = ordersHelper.getUpdateCommand(ctx);
      updateCommand();
  },

  getRemoveCommand: (item, ctx) => () => {
    ctx.setErr(null); 
    if (ctx.items.length === 1) {
      ctx.setErr({ order: "Order cannot be empty" })
      return;
    }

    if (ctx.products) {
      const selProduct = ctx.products
        .find(p => p.productId === item.product.productId);

      if (selProduct) {
        selProduct.stock += item.quantity;
        ctx.setProducts([...ctx.products]);
      }
    }
    
    ctx.order.total -= item.product.price * item.quantity;
    
    ctx.items = ctx.items.filter(i => i.product.productId !== item.product.productId);
    const updateCommand = ordersHelper.getUpdateCommand(ctx);
    updateCommand();
  },

  getUpdateOrderCommand: (ctx) => async () => {
    if (ctx.order.unregCust) {
      try {
        await api
          .patch(
            UNREGISTERED + "/" + ctx.order.unregCust.unregisteredCustomerId,
            ctx.order.unregCust,
            {
              headers: {
                "Authorization": ctx.currentUser.jwt
              }
            }
          )
      } catch(error) {
        if (error.response.data) {
          ctx.setErr(error.response.data);
          return;
        }
        ctx.navigate(ERROR_PAGE);
        return;
      }
    }
    
    try {
      await api
        .patch(
          ORDERS + "/" + ctx.order.orderId,
          ctx.order,
          {
            headers: {
              "Authorization": ctx.currentUser.jwt
            }
          }
        )
    } catch(error) {
      ctx.navigate(ERROR_PAGE);
    }

    window.location.reload(false);
  },

  getSaveChangesCommand: (ctx) => () => {
    ctx.order.orderProducts = 
      ctx.order.orderProducts.filter(op => op.quantity > 0);
    if (ctx.order.orderProducts.length === 0) {
      ctx.navigate(ERROR_PAGE);
    }
    const updateOrderCommand = ordersHelper.getUpdateOrderCommand(ctx);
    updateOrderCommand();
  },

  getFetchDeliveriesCommand: (ctx) => async () => {
    try {
        const deliveries = await api
            .get(DELIVERIES)
            .then(resp => resp.data);

        ctx.setDeliveries(deliveries);
    } catch {
        ctx.navigate(MANAGER_PAGE);
    }
  },

  statusColor: (stat) => {
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
  },
  
  STATUSES: [
    "POSTED",
    "ACCEPTED",
    "SHIPPING",
    "DELIVERED",
    "COMPLETED",
    "ABOLISHED"
  ]
}

export default ordersHelper;