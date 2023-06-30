import search from "../../img/search.png";
import styles from "../../style/Products.module.css";

export function SearchBar() {
    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <img className={styles.searchBarIcon} src={search} alt="searchImage" />
                <input className={styles.searchBarPrompt} type="text" placeholder="What do you want to find?"/>
                <button className={styles.searchBarEnterButton}>Search</button>
            </div>
        </div>
    );
}