import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: []
    },
    reducers: {
        addProductToCart: (state, action) => {
            const id = action.payload.id;
            const stock = action.payload.stock;

            if (stock === 0) {
                return;
            }

            const inCart = state.products.find(
                item => item.id === id
            );

            if (inCart) {
                if (inCart.quantity + 1 <= stock) {
                    ++inCart.quantity;
                }
            } else {
                state.products.push({ id: id, quantity: 1 })
            }
        },
        setPrice: (state, action) => {
            const id = action.payload.id;
            const price = action.payload.price;
            const target = state.products.find(p => p.id === id);

            target.price = price;
        },
        incrementQuantity: (state, action) => {
            const id = action.payload.id;
            const stock = action.payload.stock;
            console.log(id + " " + stock);

            const inCart = state.products.find(
                p => p.id === id
            );

            if (inCart) {
                if (inCart.quantity + 1 <= stock) {
                    ++inCart.quantity;
                }
            } else {
                state.products.push({ id: id, quantity: 1 });
            }
        },
        decrementQuantity: (state, action) => {
            const prods = state.products;
            const id = action.payload;
            const inCart = prods.find(
                p => p.id === id
            );
            if (inCart.quantity !== 1) {
                --inCart.quantity;
            } else {
                state.products = prods.filter(
                    p => p.id !== id
                );
            }
        },
        removeProduct: (state, action) => {
            const prods = state.products;
            const id = action.payload;

            state.products = prods.filter(
                p => p.id !== id
            );
        },
        clearCart: (state, action) => {
            state.products = [];
        }
    }
});

export const { 
    addProductToCart, 
    setPrice,
    incrementQuantity, 
    decrementQuantity, 
    removeProduct ,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;