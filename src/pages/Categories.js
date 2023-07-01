import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, PRODUCTS } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

export function Categories() {
    const [params, setParams] = useSearchParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(params.get("id"), setProducts);
    }, []);

    return (
        <div>
            {(products == null || products.length == 0) && <h1>There is nothing here</h1>}
            {products?.map(prod => {
                return (
                    <div key={prod.productId}>
                        <h1>{prod.name}</h1>
                        <p>{prod.description}</p>
                        <p>Price - ${prod.price}</p>
                        {prod.stock ? <p>In stock</p> : <p>Not in stock</p>}
                    </div>
                );
            })}
        </div>
    );
}

async function fetchProducts(id, setProducts) {
    let result = await Axios.get(API_BASE_URL + PRODUCTS + "?category=" + id)
                            .then(res => res.data); 
    setProducts(result);
}