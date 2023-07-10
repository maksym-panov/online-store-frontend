import { PaginationLink } from "./PaginationLink";
import { Link } from "react-router-dom";
import s from "../style/Pagination.module.css";

export function Pagination(props) {
    const URL = props.baseUrl;
    const current = props.current == null ? 1 : props.current;
    const PER_PAGE = props.perPage;
    const entities = props.entities;


    let nextAvailable = 0;
    if (entities.length > 1 * PER_PAGE) {
        nextAvailable = 1;
    }
    if (entities.length > 2 * PER_PAGE) {
        nextAvailable = 2;
    }

    return (
        <div className={s.paginationContainer}>
            <div className={s.pagination}>
                {
                    current > 1 && (
                        <Link to={URL + "?page=" + (Math.max(current - 1, 1))}>
                            <div className={s.leftArrow}></div>
                        </Link>
                    )
                }

                {current > 2 && <PaginationLink baseUrl={URL} page={1} />}
                {current > 3 && <div className={s.dots}>...</div>}
                {current > 1 && <PaginationLink baseUrl={URL} page={current - 1} />}
                <PaginationLink type="primary" baseUrl={URL} page={current} />
                {nextAvailable > 0 && <PaginationLink baseUrl={URL} page={Number(current) + 1} />}
                {nextAvailable > 1 && <div className={s.dots}>...</div>}
                
                {
                    nextAvailable > 0 && (
                        <Link to={URL + "?page=" + (Number(current) + 1)}>
                            <div className={s.rightArrow} ></div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}