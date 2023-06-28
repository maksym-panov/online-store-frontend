import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, PRODUCTS } from "../utils/constants";

export function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const prom = await Axios.get(API_BASE_URL + PRODUCTS);
        setProducts(prom.data);
    }

    return (
        <div>
            {products.map(prod => <h1 key={prod.productId}>{prod.name}</h1>)}
        </div>
    );
}