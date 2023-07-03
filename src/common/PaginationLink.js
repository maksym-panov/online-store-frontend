import { Link } from "react-router-dom";
import styles from "../style/Pagination.module.css";

export function PaginationLink(props) {
    const URL = props.baseUrl;
    const PAGE = props.page;
    const TYPE = props.type;

    if (TYPE == "primary") {
        return (
            <Link className={`${styles.link} ${styles.primaryPageNumber}`} to={URL + "?page=" + PAGE}>
                <div>
                    {PAGE}
                </div>
            </Link>
        );
    }

    return (
        <Link className={`${styles.link} ${styles.secondaryPageNumber}`} to={URL + "?page=" + PAGE}>
            <div>
                {PAGE}
            </div>
        </Link>
    );
}