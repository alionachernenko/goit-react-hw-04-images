import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import { Overlay } from "./Modal.styled";
import { ModalWindow } from "./Modal.styled";

const modalRoot =  document.querySelector('#modal-root')

export const Modal = ({image, tags, onClose}) => {

    useEffect(() => {
        const handleEscapePress = (e) => {
            if (e.code === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscapePress)

        return () => { window.removeEventListener('keydown', handleEscapePress) }
    }, [onClose])

 

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return createPortal(
        <Overlay className="overlay" onClick={handleOverlayClick}>
            <ModalWindow className="modal">
                <img src={image} alt={tags}/>
            </ModalWindow>
        </Overlay>, modalRoot
    )
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}
