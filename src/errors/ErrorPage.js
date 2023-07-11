import s from "../style/ErrorPage.module.css";
import error from "../img/error.png";

export const ErrorPage = () => {
    return (
        <div className={s.errpBody}>
            <div className={s.errCont}>
                <div 
                    style={
                        {
                            backgroundImage: `url(${error})`
                        }
                    }
                    className={s.errImg}
                ></div>
                <div>
                    <h4 className={`${s.text} ${s.title}`}>Something went wrong...</h4>
                    <h5 className={s.text}>Try again later</h5>
                </div>
            </div>
        </div>
    );
}