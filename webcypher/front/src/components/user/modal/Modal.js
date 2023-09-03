import React, { useEffect } from 'react';
import Avatar from '@components/user/avatar';
import { CloseIcon } from '@config/icons';
import './style.scss'

const Modal = ( {onRequestClose, data } ) => {
    useEffect(() => {
        function onKeyDown(event) {
            if (event.keyCode === 27) {
                onRequestClose();
            }
        }
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "visible";
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <div className="modal__backdrop">
            <div className="modal__container">
                <CloseIcon className='white right3' onClick={onRequestClose} />
                <Avatar configAvatar={data} />
            </div>
        </div>
    );
};

export default Modal;