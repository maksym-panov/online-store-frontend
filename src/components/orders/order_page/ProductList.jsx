import s from "../../../style/Orders.module.css";
import ProductEntry from "./ProductEntry";

const ProductList = (props) => {
  const ctx = props.mediator;

  return (
    <div className={s.prodCont}>
      {
        ctx.products?.map(p => {
          adjustStock(p, ctx);                        
          return <ProductEntry product={ p } mediator={ ctx } />;
        })
      }
    </div>
  );
}

const adjustStock = (p, ctx) => {
  const correspItem = ctx.items
    .find(i => i.product.productId === p.productId);
             
  if (correspItem) {
    const itemProduct = correspItem.product;
    p.stock = itemProduct.stock;
  }
}

export default ProductList;