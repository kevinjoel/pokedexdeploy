import React from 'react';

const Loading = (props) => {
    const { 
        style
    } = props;

    return (
        <div className="loader" style={style}/>
    )
}

export default Loading;