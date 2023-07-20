import s from "../style/ErrorPage.module.css";
import errorGeneral from "../img/error.png";
import errorAccess from "../img/accessError.png"

export default (props) => {
    let message;
    let submessage = "";
    let image;
    if (props.type === 403) {
        message = "You are not allowed to be here";
        image = errorAccess;
    } else {
        message = "Something went wrong...";
        submessage = "Try again later";
        image = errorGeneral;
    }

    return (
        <div className={s.errpBody}>
            <div className={s.errCont}>
                <div 
                    style={
                        {
                            backgroundImage: `url(${image})`
                        }
                    }
                    className={s.errImg}
                ></div>
                <div>
                    <h4 className={`${s.text} ${s.title}`}>{ message }</h4>
                    <h5 className={s.text}>{ submessage }</h5>
                </div>
            </div>
        </div>
    );
}