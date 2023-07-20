import profileS from "../../style/Profile.module.css";

export default (props) => {
    const name = props.name;
    const err = props.err;
    const value = props.value; 
    const setValue = props.setValue;
    const type = props.type;
    const req = props.req;

    return (
        <label className={profileS.changeDataPiece}>
            <h4 className={profileS.dataHead}>{ name }{req && "*"}</h4>
            { err && <p className={profileS.validationError}>{ err }</p>}
            <input 
                defaultValue={ value ? value : "" }
                onChange={e => setValue(e.target.value)} 
                className={`${profileS.dataBody} ${profileS.prompt}`} 
                type={ type }
            />
        </label>
    );
}