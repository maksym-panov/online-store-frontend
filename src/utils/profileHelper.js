import api from "../utils/axiosHelper";
import { setUser } from "../features/auth/userSlice";
import { clearCart } from "../features/cartSlice";
import {
  USERS,
  PROFILE_PAGE,
  BASE64_RESOLVER,
  EMPTY_PAGE
} from "../utils/constants";
import accountWhite from "../img/accountWhite.png";

const profileHelper = {
  getApplyChangesCommand: (ctx) => async () => {
    let authEntity;
    try {
        authEntity = await api.patch(
            USERS + "/" + ctx.cusr.userId,
            ctx.toSend,
            {
                headers: {
                    "Authorization": ctx.cusr.jwt
                }
            }
        )
        .then(resp => resp.data)
    } catch (error) {
        ctx.setErrorState(true);
        ctx.setErr(error.response.data)
        return;
    }

    let jwt;
    if (authEntity.jwt === "") {
        jwt = ctx.cusr.jwt;
    } else {
        jwt = "Bearer " + authEntity.jwt;
    }

    const newUser = await api.get(
        USERS + "/" + authEntity.userId,
        {
            headers: {
                "Authorization": jwt
            }
        }
    ).then(resp => resp.data)


    if (authEntity.jwt !== "") {
        newUser.jwt = jwt;
    } else {
        newUser.jwt = ctx.cusr.jwt;
    }

    ctx.dispatch(setUser(newUser));
    ctx.navigate(PROFILE_PAGE);
  },

  profileImageStyle: (image) => image ? 
    { backgroundImage: "url(" + BASE64_RESOLVER + image + ")" } :
    { 
        backgroundImage: `url(${accountWhite})`, 
        border: "2px black solid",
        backgroundColor: "black"   
    },
  
  getLogoutCommand: (ctx) => () => {
    ctx.dispatch(clearCart());
    ctx.dispatch(setUser({}));
    ctx.navigate(EMPTY_PAGE);
  },

  fullname: (ctx) => {
    return ctx.pi?.firstname + 
    (
      ctx.pi?.lastname ? 
      " " + ctx.pi.lastname : 
      ""
    )
  },

  getChangeCommand: (ctx) => () => {
    ctx.navigate(PROFILE_PAGE + "/change")
  }
}

export default profileHelper;