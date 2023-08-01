import { 
    useState,
    useEffect
} from "react";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import s from "../../style/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { ping } from "../../utils/webHelpers";
import ChangeProfileData from "../../components/users/ChangeProfileData";
import ChangeProfileButtons from "../../components/users/ChangeProfileButtons";

const ChangeProfile = () => {
    const ctx = {};
    [ctx.err, ctx.setErr] = useState({});
    [ctx.errorState, ctx.setErrorState] = useState(false);
    ctx.navigate = useNavigate();
    ctx.dispatch = useDispatch();
    ctx.cusr = useSelector(state => state.user);
    ctx.cpi = ctx.cusr.personalInfo;
    ctx.ca = ctx.cusr.address;

    useEffect(() => {
        ping(ctx.cusr, ctx.dispatch);
    }, []);

    return (
        <div className={s.profileContainer}>
            <div className={`${s.profile} ${s.changeProfile}`}>
                <div className={`${s.column} ${s.changePageColumn}`}>
                    <ChangeProfileData mediator={ ctx } />    
                    <ChangeProfileButtons mediator={ ctx } />
                    { ctx.errorState && <p className={s.validationError}>Incorrect data</p> }
                </div>
            </div>
        </div>
    );
}

export default ChangeProfile;