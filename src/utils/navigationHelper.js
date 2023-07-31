import account from "../img/account.png";
import cart from "../img/cart.png";
import { BASE64_RESOLVER } from "./constants";

const navHelper = {
    cartImage: { backgroundImage: `url(${cart})` },
    
    showStyle: {
        display: "flex",
        fontSize: `0.8rem`
    },
    
    evalProductsInCart: (ctx) => {
        let count = 0;
        ctx.products.forEach(p => {
            count += p.quantity;
        });
        return count;
    },
    
    accountImage: (ctx) => 
        ctx.user && ctx.user.image ?
        { backgroundImage: `url("${ BASE64_RESOLVER + ctx.user.image }")` } :
        { backgroundImage: `url(${ account })` },

    accountText: (ctx) => 
        ctx.user && ctx.user.personalInfo && ctx.user.personalInfo.firstname ? 
        ctx.user.personalInfo.firstname : 
        "Account"
}

export default navHelper;
