import { Link, useLocation, useSearchParams } from "react-router-dom";
import s from "../style/Pagination.module.css";

export function PaginationLink(props) {
    const PAGE = props.page;
    const TYPE = props.type;
    const l = useLocation();
    const [p, setP] = useSearchParams();

    let URL = l.pathname + "?";

    for (let e of p.entries()) {
        if (e[0] !== "page") {
            URL += e[0] + "=" + e[1] + "&";
        }    
    }

    URL += "page=" + PAGE;

    if (TYPE == "primary") {
        return (
            <Link 
                className={`${s.link} ${s.primaryPageNumber}`} 
                to={ URL }
            >
                <div>
                    {PAGE}
                </div>
            </Link>
        );
    }

    return (
        <Link 
            onClick={ () => document.getElementById("list").scrollIntoView() }
            className={`${s.link} ${s.secondaryPageNumber}`} 
            to={ URL }
        >
            <div>
                {PAGE}
            </div>
        </Link>
    );
}