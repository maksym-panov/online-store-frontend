import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MANAGE_PRODUCTS_PAGE, PRODUCTS } from "../../utils/constants";
import { api } from "../../utils/axiosHelper";

export default (props) => {
    const id = props.productId;
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct(id, setProduct, navigate);
    }, [])

    return (
        <div>{ product?.productId }</div>
    )
}

const fetchProduct = (id, setProduct, navigate) => {
    try {
        const product = api
            .get(PRODUCTS + "/" + id)
            .then(resp => resp.data);
        
            setProduct(product);
    } catch(error) {
        navigate(MANAGE_PRODUCTS_PAGE);
    }
}