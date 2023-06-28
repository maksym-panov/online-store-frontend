import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, PRODUCT_CATEGORIES } from "../utils/constants";

export function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const prom = await Axios.get(API_BASE_URL + PRODUCT_CATEGORIES);
        setCategories(prom.data);
    }

    return (
        <div>
            {categories.map(categ => <h1>{categ.name}</h1>)}
        </div>
    );
}