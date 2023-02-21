import { useState } from "react";
import { Gallery } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

import { ImageGalleryItem, Modal} from "components";

export const ImageGallery = ({images}) => {

    const [showModal, setShowModal] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const toggleModal = () => {
        setShowModal(isOpen => !isOpen)
    }

    const currentImage = images[activeIndex]

        return (
            <>
                {<Gallery className="gallery"> 
                    {images.map(({id, webformatURL, tags}, index) => {
                        return <ImageGalleryItem key={id} link={webformatURL} tag={tags} onClick={() => { 
                                    toggleModal()
                                    setActiveIndex(index)
                                }}/>
                               
                    })}
                </Gallery>}
                {showModal && <Modal image={currentImage.largeImageURL} tags={currentImage.tags} onClose={toggleModal}/>}
            </>
        )
    }



 ImageGallery.propTypes = {
        images: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired
        })).isRequired
    }
