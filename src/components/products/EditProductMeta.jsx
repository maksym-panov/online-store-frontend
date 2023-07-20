import s from "../../style/ManagerProducts.module.css";

export default (props) => {
    const name = props.name;
    const setName = props.setName;
    const price = props.price;
    const setPrice = props.setPrice;
    const stock = props.stock;
    const setStock = props.setStock;
    const err = props.err;

    return (
        <div className={s.pMetaSect}>
            <label className={s.lab}>
                { err?.name && <p className={s.validationError}>{ err.name }</p> }
                Product name
                <input 
                    type="text" 
                    value={ name } 
                    onChange={ e => setName(e.target.value) }
                />
            </label>
            <label className={s.lab}>
                { err?.price && <p className={s.validationError}>{ err.price }</p> }
                Price ($)
                <input 
                    type="number"
                    value={ price } 
                    onChange={ e => setPrice(e.target.value) }
                />
            </label>
            <label className={s.lab}>
                { err?.stock && <p className={s.validationError}>{ err.stock }</p> }
                Stock
                <input 
                    type="number"
                    value={ stock }
                    onChange={ e => setStock(e.target.value) } 
                />
            </label>   
        </div>
    );
}