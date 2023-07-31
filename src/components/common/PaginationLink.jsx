import { 
    Link, 
    useLocation, 
    useSearchParams 
} from "react-router-dom";
import ph from "../../utils/paginationHelper";

export default (props) => {
    const ctx = {};
    ctx.PAGE = props.page;
    ctx.TYPE = props.type;
    ctx.l = useLocation();
    [ctx.p, ctx.setP] = useSearchParams();

    let URL = ctx.l.pathname + "?";

    for (let e of ctx.p.entries()) {
        if (e[0] !== "page") {
            URL += e[0] + "=" + e[1] + "&";
        }    
    }

    URL += "page=" + ctx.PAGE;

    return (
        <Link onClick={ ph.afterRefresh(ctx) } 
            className={ ph.numberClass(ctx) } 
            to={ URL }
        >
            <div>{ ctx.PAGE }</div>
        </Link>
    );
}