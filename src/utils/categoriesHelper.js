import {
  PRODUCT_CATEGORIES,
  ERROR_PAGE
} from "../utils/constants";
import api from "../utils/axiosHelper";

const categoriesHelper = {
  titleStyle: {
      backgroundColor: "#e6f4f1",
      margin: 0,
      textAlign: "center",
      paddingTop: "30px"
  },

  getFetchCategoryCommand: (ctx) => async () => {
    try {
      const categ = await api
          .get(PRODUCT_CATEGORIES + "/" + ctx.id)
          .then(resp => resp.data);
      ctx.setCateg(categ);
    } catch(error) {
        ctx.navigate(ERROR_PAGE);
    }
  },

  getFetchCategoriesCommand: (ctx) => async () => {
    try {
        const categArr = await api
            .get(PRODUCT_CATEGORIES)
            .then(resp => resp.data);
        ctx.setCategArr(categArr);
    } catch(error) {
        ctx.navigate(ERROR_PAGE);
    }
  }
}

export default categoriesHelper;