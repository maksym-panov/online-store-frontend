  import api from "./axiosHelper";
  import { setUser } from "../features/auth/userSlice";

export const getBase64 = async (file, consumer) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let result = reader.result;
        let cutIdx = result.indexOf(",");
        consumer(result.substring(cutIdx + 1));
    }
    reader.onerror = (error) => {
        console.log(error)
    }
}

export const ping = async (user, dispatch) => {
    if (!user.userId) {
        return;
    }
    
    try {
        const valid = await api.post(
            "/ping/" + user.userId,
            user.jwt.substring(7),
            {
                headers: {
                    "Authorization": user.jwt
                }
            }
        );

        if (!valid) {
            dispatch(setUser({}));
        }
    } catch(error) {
        dispatch(setUser({}));
    }
}