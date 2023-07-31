import s from "../style/Pagination.module.css";

const paginationHelper = {
  evalNextAvail: (ctx) => {
    if (ctx.entities.length > 1 * ctx.PER_PAGE) {
        return 1;
    }
    if (ctx.entities.length > 2 * ctx.PER_PAGE) {
        return 2;
    }
    return 0;
  },

  evalPrevAndNext: (ctx) => {
    let PREV_URL = ctx.l.pathname + "?";
    let NEXT_URL = ctx.l.pathname + "?";

    for (let e of ctx.p.entries()) {
        if (e[0] !== "page") {
            PREV_URL += e[0] + "=" + e[1] + "&";
            NEXT_URL += e[0] + "=" + e[1] + "&";
        }    
    }

    PREV_URL += "page=" + Math.max(ctx.current - 1, 1);
    NEXT_URL += "page=" + (Number(ctx.current) + 1);

    return [PREV_URL, NEXT_URL];
  },

  showPagination: (ctx) => { 
    return {
      display: ctx.entities.length <= ctx.PER_PAGE && ctx.current === 1 ? "none" : "flex"
    }
  },

  numberClass: (ctx) => 
    `${s.link} ${ctx.TYPE == "primary" ? s.primaryPageNumber : s.secondaryPageNumber}`,

  scroll: () => document.getElementById("list").scrollIntoView(),

  afterRefresh: (ctx) => {
    if (ctx.TYPE == "primary")
        return () => {};
    return paginationHelper.scroll;
  } 
}

export default paginationHelper;