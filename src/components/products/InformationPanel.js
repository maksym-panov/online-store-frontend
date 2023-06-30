import styles from "../../style/Products.module.css";
import acer_predator from "../../img/acer_predator.jpg";
import { Link } from "react-router-dom";
import { ABOUT_PAGE, PRODUCTS_PAGE } from "../../utils/constants";

export function InformationPanel() {
    return (
        <div className={styles.informationPanelContainer}>
            <div className={styles.categoriesContainer}>

            </div>
            <div className={styles.informationBanner}>
                <Link to={ PRODUCTS_PAGE + "?id=1" } className={styles.informationBannerLink}>
                    <img src={acer_predator} className={styles.informationBannerImage}/>
                </Link>
                <div className={styles.descriptionPanel}>
                    <h1 className={styles.descriptionPanelHeader}>Predator Helios 300</h1>
                    <hr className={styles.descriptionSeparator} />
                    <p className={styles.descriptionPanelText}>Діагональ екрана - 15.6"</p>
                    <p className={styles.descriptionPanelText}>Тип екрана - IPS</p>
                    <p className={styles.descriptionPanelText}>Роздільна здатність - 1920x1080</p>
                    <p className={styles.descriptionPanelText}>Частота оновлення екрана - 165 Гц</p>
                    <p className={styles.descriptionPanelText}>Відеокарта - GeForce RTX 3070 Ti</p>
                    <p className={styles.descriptionPanelText}>Обсяг пам'яті відеокарти - 8 ГБ</p>
                    <p className={styles.descriptionPanelText}>Процесор - Intel Core i7-12700H (3.5 - 4.7 ГГц)</p>
                    <p className={styles.descriptionPanelText}>Обсяг оперативної пам'яті - 16 ГБ</p>
                    <p className={styles.descriptionPanelText}>Тип оперативної пам'яті - DDR5</p>
                    <p className={styles.descriptionPanelText}>Обсяг SSD - 1 ТБ</p>
                    <p className={styles.descriptionPanelText}></p>
                    <p className={styles.descriptionPanelText}></p>
                    <p className={styles.descriptionPanelText}></p>
                    <p className={styles.descriptionPanelText}></p>
                    <p className={styles.descriptionPanelText}></p>
                    <p className={styles.descriptionPanelText}></p>
                    <div className={styles.descriptionPanelButtonContainer}>
                        <button className={styles.descriptionPanelButton}>Go to product page</button>
                    </div>
                </div>
            </div>
        </div>
    );
}