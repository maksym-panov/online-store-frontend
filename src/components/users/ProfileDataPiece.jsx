import s from "../../style/Profile.module.css";

export default (props) => {
    const value = props.value;
    const name = props.name;

    return (
        <div className={s.dataPiece}>
            <h5 className={s.dataHead}>{ name }</h5>
            <p className={s.dataBody}>
                { value ? value : " - " }
            </p>
        </div>
    );
}