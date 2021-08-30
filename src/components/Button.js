import React from 'react';
import '../styles/styles.scss';
import Loading from './Loding';
const Button = (props) => {
    const {
        title,
        icon,
        onClick,
        stylesIcon,
        isLoading
    } = props;


    return (
        <button
            className={icon ? "button-icon" : "button"}
            type="button"
            onClick={onClick}
            style={{ display: "flex", alignItems: "center" }}>
            {isLoading && <Loading style={{ marginRight: 10 }} />}
            {title}
            {icon && <i className={icon} style={stylesIcon} />}
        </button>
    )
}

export default Button;