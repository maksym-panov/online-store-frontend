import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  USERS,
  PROFILE_PAGE,
  ERROR_PAGE
} from "./constants";
import api from "./axiosHelper";
import { setUser } from "../features/auth/userSlice";

const authHelper = {
  authCommand: async (auth, ctx) => {
    try {
      const user = await api.get(
        USERS + "/" + auth.userId,
        {
          headers: {
            "Authorization": "Bearer " + auth.jwt
          }
        }
      ).then(resp => resp.data);
      
      user.jwt = "Bearer " + auth.jwt;
      ctx.dispatch(setUser(user));

      if (ctx.redirect) {
        ctx.navigate(ctx.redirect);
      } else {
        ctx.navigate(PROFILE_PAGE);
      }
    } catch {
      ctx.navigate(ERROR_PAGE);
    }
  },

  getLoginCommand: (ctx) => async () => {
    let authResp;   
    try {
      authResp = await api.post(
        SIGN_IN_USER, 
        {
          phoneNumber: ctx.phoneNumber,
          password: ctx.password
        }
      ).then(resp => resp.data);
    } catch(error) {
      if (!error.response) {
        ctx.navigate(ERROR_PAGE);
        return;
      }

      if (!error.response.data.message) {
        ctx.setErr({ message: "Could not find user" });
      } else {
        ctx.setErr(error.response.data);
      }
    }

    authHelper.authCommand(authResp, ctx);
  },

  getRegisterCommand: (ctx) => async () => {
        let authResp;

        try {
            authResp = await api.post(
                SIGN_UP_USER,
                {
                    firstname: ctx.firstname,
                    lastname: ctx.lastname,
                    phoneNumber: ctx.phoneNumber,
                    email: ctx.email,
                    password: ctx.password
                } 
            ).then(resp => resp.data);
        } catch(error) {
            if (!error.response) {
                ctx.navigate(ERROR_PAGE);
                return;
            }

            ctx.setErr(error.response.data);
            return;
        }
     
        authHelper.authCommand(authResp, ctx);
    }
}

export default authHelper;