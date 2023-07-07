import { useState, useEffect } from "react";
import { API_PROD_CATEGORY_PARAM, PRODUCTS, PRODUCT_CATEGORIES } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import { api } from "../utils/axiosHelper";

export function Categories() {
    const [params, setParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const id = params.get("id");

    useEffect(() => {
        if (id) {
            fetchProducts(id, setProducts);
        } else {
            fetchCategories(setCategories);
        }
    }, []);

    if (id) {
        return (
            <div>
                {products?.map(p => <h1>{p.name}</h1>)}
            </div>
        );
    }

    return (
        <div>
            {categories?.map(c => <h1>{c.name}</h1>)}
        </div>
    )
}

async function fetchProducts(id, setProducts) {
    const products = await api.get(PRODUCTS + "?" + API_PROD_CATEGORY_PARAM + id)
                                .then(resp => resp.data);
    setProducts(products);
}

async function fetchCategories(setCategories) {
    const categories = await api.get(PRODUCT_CATEGORIES)
                                .then(resp => resp.data);
    setCategories(categories);
}