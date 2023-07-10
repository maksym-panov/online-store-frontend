import search from "../../img/search.png";
import s from "../../style/Products.module.css";

export function SearchBar() {
    return (
        <div className={s.searchBarContainer}>
            <div className={s.searchBar}>
                <img className={s.searchBarIcon} src={search} alt="searchImage" />
                <input className={s.searchBarPrompt} type="text" placeholder="What do you want to find?"/>
                <button className={s.searchBarEnterButton}>Search</button>
            </div>
        </div>
    );
}