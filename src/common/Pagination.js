import { PaginationLink } from "./PaginationLink";
import { 
    Link, 
    useLocation, 
    useSearchParams 
} from "react-router-dom";
import s from "../style/Pagination.module.css";

export function Pagination(props) {
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

    const l = useLocation();
    const [p, setP] = useSearchParams();

    let PREV_URL = l.pathname + "?";
    let NEXT_URL = l.pathname + "?";

    for (let e of p.entries()) {
        if (e[0] !== "page") {
            PREV_URL += e[0] + "=" + e[1] + "&";
            NEXT_URL += e[0] + "=" + e[1] + "&";
        }    
    }

    PREV_URL += "page=" + Math.max(current - 1, 1)
    NEXT_URL += "page=" + (Number(current) + 1);

    const showPagination = {
        display: entities.length <= PER_PAGE && current === 1 ? "none" : "flex"
    }

    return (
        <div style={ showPagination } className={s.paginationContainer}>
            <div className={s.pagination}>
                {
                    current > 1 && (
                        <Link 
                            onClick={
                                document
                                    .getElementById("list")
                                    ?.scrollIntoView()
                            } 
                            to={ PREV_URL }
                        >
                            <div className={s.leftArrow}></div>
                        </Link>
                    )
                }

                {current > 2 && <PaginationLink page={1} />}
                {current > 3 && <div className={s.dots}>...</div>}
                {current > 1 && <PaginationLink page={current - 1} />}
                <PaginationLink type="primary" page={current} />
                {nextAvailable > 0 && <PaginationLink page={Number(current) + 1} />}
                {nextAvailable > 1 && <div className={s.dots}>...</div>}
                
                {
                    nextAvailable > 0 && (
                        <Link 
                            onClick={
                                document
                                    .getElementById("list")
                                    ?.scrollIntoView()
                            } 
                            to={ NEXT_URL }
                        >
                            <div className={s.rightArrow} ></div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}