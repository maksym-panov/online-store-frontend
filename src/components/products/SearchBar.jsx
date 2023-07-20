import search from "../../img/search.png";
import s from "../../style/Products.module.css";
import { useState } from "react";
import api from "../../utils/axiosHelper";

import { 
    API_ENTITIES_PER_PAGE_PARAM, 
    API_NAME_PARAM, 
    BASE64_RESOLVER, 
    PRODUCTS, 
    PRODUCTS_PAGE 
} from "../../utils/constants";
import { Link } from "react-router-dom";

export default () => {
    const [query, setQuery] = useState("");
    const [ps, setPs] = useState([])

    const fetchProducts = async (value) => {
        try {
            setQuery(value);
            if (value === "") {
                setPs([]);
                return;
            }

            const res = await 
                api.get(
                    PRODUCTS + "?" + API_ENTITIES_PER_PAGE_PARAM + 9 + "&" + API_NAME_PARAM + value,
                    {
                        headers: {
                            "Content-Type": "text/plain"
                        }
                    },
                )
                .then(resp => resp.data);
            setPs(res);
        } catch(ignored) {}
    }

    return (
        <div className={s.searchBarContainer}>
            <div className={s.searchBar}>
                <img className={s.searchBarIcon} src={search} alt="searchImage" />
                <input 
                    className={s.searchBarPrompt} 
                    type="text" 
                    placeholder="What do you want to find?"
                    onChange={ (e) => fetchProducts(e.target.value) }
                    value={ query }
                />
                <a href={PRODUCTS + "?name=" + query}>
                    <button className={s.searchBarEnterButton}>
                        Search
                    </button>
                </a>
                <div className={s.foundPrd}>
                    {
                        ps?.map(p => (
                            <Link 
                                key={p.productId}
                                to={PRODUCTS_PAGE + "?id=" + p.productId}
                                className={s.srchLink}
                            >
                                <div 
                                    style={
                                        {
                                            backgroundImage: "url(" + BASE64_RESOLVER + p.image + ")"
                                        }
                                    } 
                                    className={s.imgCont}></div>
                                <h5 className={s.titleSrch}>{p.name}</h5>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}