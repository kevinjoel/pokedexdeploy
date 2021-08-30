import React from 'react';
import '../styles/styles.scss';
import Loading from './Loding';
const IconButton = (props) => {
    const {
        title,
        icon,
        onClick,
        stylesBtn,
        stylesIcon,
        isLoading
    } = props;


    return (
        <button
            className="button-icon"
            type="button"
            onClick={onClick}
            style={{
                ...stylesBtn,
                display: "flex",
                alignItems: "center"
            }}
            disabled={isLoading}>
            {isLoading && <Loading style={{ marginRight: 10 }} />}
            {icon && <i className={icon} style={stylesIcon} />}
            {title}
        </button >
    )
}

export default IconButton;