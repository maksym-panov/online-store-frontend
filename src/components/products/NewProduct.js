import s from "../../style/ManagerProducts.module.css";
import { 
    BASE64_RESOLVER, 
    MANAGE_PRODUCTS_PAGE, 
    PRODUCTS, 
    ERROR_PAGE 
} from "../../utils/constants";
import { api } from "../../utils/axiosHelper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getBase64 } from "../../utils/webHelpers";
import CategoriesSelect from "./CategoriesSelect";

export default () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);
    const [description, setDescription] = useState(null);

    const [categories, setCategories] = useState([]);

    const [err, setErr] = useState(null);

    return (
        <div className={s.pPag}>
            <div className={s.pInfCont}>
                <div className={s.pTitleSect}>
                    <h1 className={s.text}>Add new product</h1>
                </div>
                {
                    image &&
                    <div 
                        style={{
                            backgroundImage: `url(${BASE64_RESOLVER + image})`
                        }}
                        className={s.imageSect}
                    ></div>
                }
                <input 
                    className={s.inpF} 
                    type="file"
                    onChange={ e => 
                        getBase64(
                            e.target.files[0], 
                            setImage
                        )
                    }
                 /> 
                <div className={s.pMetaSect}>
                    <label className={s.lab}>
                        { err?.name && <p className={s.validationError}>{ err.name }</p> }
                        Product name
                        <input 
                            type="text" 
                            value={ name } 
                            onChange={ e => setName(e.target.value) }
                        />
                    </label>
                    <label className={s.lab}>
                        { err?.price && <p className={s.validationError}>{ err.price }</p> }
                        Price ($)
                        <input 
                            type="number"
                            value={ price } 
                            onChange={ e => setPrice(e.target.value) }
                        />
                    </label>
                    <label className={s.lab}>
                        { err?.stock && <p className={s.validationError}>{ err.stock }</p> }
                        Stock
                        <input 
                            type="number"
                            value={ stock }
                            onChange={ e => setStock(e.target.value) } 
                        />
                    </label>   
                </div>

                <CategoriesSelect categories={ categories } setCategories={ setCategories } />

                <div className={s.descSect}>
                    <label className={s.descLab}>
                        Description
                        <textarea 
                            rows={20}
                            className={s.desc} 
                            value={ description } 
                            onChange={ e => setDescription(e.target.value) }
                        />
                    </label>
                </div>
                <div className={s.submSect}>
                    { err && <p className={s.validationError}>Incorrect data</p> }
                    <button 
                        onClick=
                            { () => 
                                createProduct(
                                    {
                                        name: name,
                                        image: image,
                                        price: price,
                                        stock: stock,
                                        description: description,
                                        productTypes: categories
                                    },
                                    user.jwt,
                                    navigate,
                                    setErr
                                ) 
                            }
                        style={ btnPrim }
                        className={s.tColr}
                    >
                    Save changes
                    </button> 
                </div>
                <button
                    onClick={ () => window.history.back() }
                    style={ btnBack }
                    className={s.tColr} 
                >
                Back
                </button>
            </div>
        </div>
    );
}

const createProduct = async (newProduct, token, navigate, setErr) => {
    try {
        const id = await api.post(
            PRODUCTS,
            newProduct,
            {
                headers: {
                    "Authorization": token
                }
            }
        )

        navigate(MANAGE_PRODUCTS_PAGE + "?id=" + id);
    } catch(error) {
        if (error.response?.data) {
            setErr(error.response.data);
            return;
        }

        navigate(ERROR_PAGE);
    }
}

const btnPrim = {
    height: "2.5em", 
    width: "150px", 
    backgroundColor: "#2473FF", 
    color: "white", 
    borderRadius: "15px",
    marginBottom: "10px",
    marginTop: "10px"
};

const btnBack = {
    height: "2.5em", 
    width: "150px",
    borderRadius: "15px" 
};