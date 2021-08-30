import React from 'react';

const Modal = (props) => {
    return (
        <div id="modal">
            <div id="modal-container" >
                {props.children}
            </div>
        </div>
    )
}

export default Modal;