import s from "../../style/Orders.module.css";

export default (props) => {
    const value = props.value;
    const setValue = props.setValue;
    const name = props.name;
    const type = props.type;

    return (
        <label className={s.lab}>
            { name }
            <input 
                type={ type } 
                value={ value } 
                onChange={ e => setValue(e.target.value) }  
            />
        </label>
    )
}