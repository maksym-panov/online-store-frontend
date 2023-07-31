import PaginationLink from "./PaginationLink";
import { 
    Link, 
    useLocation, 
    useSearchParams 
} from "react-router-dom";
import s from "../../style/Pagination.module.css";
import ph from "../../utils/paginationHelper";

export default (props) => {
    const ctx = {};
    ctx.current = props.current == null ? 1 : props.current;
    ctx.PER_PAGE = props.perPage;
    ctx.entities = props.entities;
    ctx.l = useLocation();
    [ctx.p, ctx.setP] = useSearchParams();

    let nextAvailable = ph.evalNextAvail(ctx);
    const [PREV_URL, NEXT_URL] = ph.evalPrevAndNext(ctx);

    return (
        <div style={ ph.showPagination(ctx) } className={s.paginationContainer}>
            <div className={s.pagination}>
                {
                    ctx.current > 1 && (
                        <Link onClick={ ph.scroll } to={ PREV_URL }>
                            <div className={s.leftArrow}></div>
                        </Link>
                    )
                }

                { ctx.current > 2 && <PaginationLink page={1} /> }
                { ctx.current > 3 && <div className={s.dots}>...</div> }
                { ctx.current > 1 && <PaginationLink page={ ctx.current - 1 } /> }
                <PaginationLink type="primary" page={ ctx.current } />
                { nextAvailable > 0 && <PaginationLink page={Number(ctx.current) + 1} /> }
                { nextAvailable > 1 && <div className={s.dots}>...</div> }
                
                {
                    nextAvailable > 0 && (
                        <Link onClick={ ph.scroll } to={ NEXT_URL }>
                            <div className={s.rightArrow} ></div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

