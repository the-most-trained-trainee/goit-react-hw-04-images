import { useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

const GalleryItem = ({ image, fullImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(open => !open);

  return (
    <>
      <li className="ImageGalleryItem" onClick={toggleModal}>
        <img src={image} alt="" className="ImageGalleryItem-image" />
      </li>
      {isModalOpen && <Modal fullImage={fullImage} close={toggleModal} />}
    </>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  fullImage: PropTypes.string.isRequired,
};

export default GalleryItem;
