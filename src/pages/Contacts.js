import s from "../style/Contacts.module.css";
import telegram from "../img/telegram.webp";
import gmail from "../img/gmail.png";
import github from "../img/github.png";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { api } from "../utils/axiosHelper";
import { setUser } from "../features/auth/userSlice";
import { useEffect } from "react";

export function Contacts() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const ping = async () => {
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

    useEffect(() => {
        ping();
    }, []);

    return (
        <div className={s.cBody}>
            <div className={s.cCont}>
                <h1 className={s.cHead}>Maksym Panov</h1>
                <div className={s.cList}>
                    <div className={s.cCard}>
                        <div 
                            className={s.ico} 
                            style={ 
                                {
                                    backgroundImage: `url(${telegram})`
                                } 
                            }
                        ></div>
                        <h3 className={s.title}>Telegram</h3>
                        <p className={s.ref}>
                            @panov-maksym
                        </p>
                    </div>
                    <div className={s.cCard}>
                        <div 
                            className={s.ico} 
                            style={ 
                                {
                                    backgroundImage: `url(${github})`
                                } 
                            }
                        ></div>
                        <h3 className={s.title}>GitHub</h3>
                        <a 
                            className={s.ref} 
                            href="https://github.com/maksym-panov"
                        >
                            https://github.com/maksym-panov
                        </a>
                    </div>
                    <div className={s.cCard}>
                        <div 
                            className={s.ico} 
                            style={ 
                                {
                                    backgroundImage: `url(${gmail})`
                                } 
                            }
                        ></div>
                        <h3 className={s.title}>Email</h3>
                        <p className={s.ref}>
                            work.maksym.panov@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}