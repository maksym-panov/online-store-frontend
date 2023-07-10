import { useState, useEffect } from "react";
import { CATEGORIES_PAGE, PRODUCT_CATEGORIES } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import { api } from "../utils/axiosHelper";
import { ProductsList } from "../components/products/ProductsList";
import s from "../style/Products.module.css";
import { Link } from "react-router-dom";

export function Categories() {
    const [params, setParams] = useSearchParams();
    const [categArr, setCategArr] = useState([]);
    const [categ, setCateg] = useState({});

    const id = params.get("id");

    const titleStyle = {
        backgroundColor: "#e6f4f1",
        margin: 0,
        textAlign: "center",
        paddingTop: "30px"
    }

    useEffect(() => {
        if (id) {
            fetchCateg(id, setCateg)
        } else {
            fetchCategArr(setCategArr);
        }
    }, []);

    if (id) {
        return (
            <>
                <h2 style={titleStyle}>Products in category "{categ?.name}"</h2>
                <ProductsList categoryId={id} />
            </>
        );
    }

    const size = categArr.length;
    const firstCol = categArr.slice(0, Math.ceil(size / 2));
    const secondCol = categArr.slice(Math.ceil(size / 2));

    console.log(firstCol);
    console.log(secondCol);

    return (
        <div className={s.ptContainer}>
            <div className={s.ptList}>
                <div className={s.col}>
                    {
                        firstCol.map(pt => (
                            <a 
                                className={s.link}
                                href={CATEGORIES_PAGE + "?id=" + pt.productTypeId}
                            >
                            {pt.name}
                            </a>
                        ))
                    }
                </div>
                <div className={s.col}>
                    {
                        secondCol.map(pt => (
                            <a 
                                className={s.link}
                                href={CATEGORIES_PAGE + "?id=" + pt.productTypeId}
                            >
                            {pt.name}
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

async function fetchCategArr(setCategArr) {
    const categArr = await api.get(PRODUCT_CATEGORIES)
                                .then(resp => resp.data);
    setCategArr(categArr);
}

async function fetchCateg(id, setCateg) {
    const categ = await api.get(PRODUCT_CATEGORIES + "/" + id)
                            .then(resp => resp.data);
    setCateg(categ);
}