import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "../../style/Profile.module.css";
import Orders from "./Orders";
import { ping } from "../../utils/webHelpers";
import { useEffect } from "react";
import ProfileData from "../../components/users/ProfileData";
import ProfileButtons from "../../components/users/ProfileButtons";

export default () => {
    const ctx = {};
    ctx.user = useSelector(state => state.user);
    ctx.pi = ctx.user.personalInfo;
    ctx.a = ctx.user.address;
    ctx.navigate = useNavigate();
    ctx.dispatch = useDispatch();

    useEffect(() => {
        ping(ctx.user, ctx.dispatch);
    }, []);

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.column}>
                    <ProfileData mediator={ ctx } />               
                    <ProfileButtons mediator={ ctx } />
                </div>
            </div>
            <Orders userId={ ctx.user.userId } />
        </div>
    );
}