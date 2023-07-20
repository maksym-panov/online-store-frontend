import { BASE64_RESOLVER } from "../../utils/constants";
import { getBase64 } from "../../utils/webHelpers";
import s from "../../style/ManagerProducts.module.css";

export default (props) => {
    const image = props.image;
    const setImage = props.setImage;

    return (
        <>
            {
                image &&
                <div 
                    style={{
                        backgroundImage: `url(${BASE64_RESOLVER + image})`
                    }}
                    className={s.imageSect}
                ></div>
            }
            <input 
                className={s.inpF} 
                type="file"
                onChange={ e => 
                    getBase64(
                        e.target.files[0], 
                        setImage
                    )
                }
            /> 
        </>
    );
}