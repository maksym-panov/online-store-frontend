import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, PRODUCT_CATEGORIES } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

export function Categories() {
    const [params, setParams] = useSearchParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories(params.get("id"), setCategories);
    }, []);

    return (
        <div>{categories?.map(el => <h1 key={el.productTypeId}>{el.name}</h1>)}</div>
    );
}

async function fetchCategories(id, setCategories) {
    let result = await Axios.get(API_BASE_URL + PRODUCT_CATEGORIES + (id == null ? "" : "/" + id));
    setCategories(id == null ? result.data : [result.data]);
}