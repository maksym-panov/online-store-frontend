import loginStyles from "../../style/Login.module.css";

export default (props) => {
    const name = props.name;
    const err = props.err;
    const setValue = props.setValue;
    const plhol = props.plhol;
    const type = props.type;
    const req = props.req;

    return (
        <label className={loginStyles.inputLabel}>
            { name }{ req ? "*" : "" }
            { err && <p className={loginStyles.validationError}>{ err }</p>}
            <input 
                onChange={e => setValue(e.target.value)}
                className={loginStyles.prompt} 
                type={ type }
                placeholder={ plhol }
            />
        </label>
    );
}