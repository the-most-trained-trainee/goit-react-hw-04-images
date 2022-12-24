import React from 'react';
import GalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

const ImmageGallery = ({ pics }) => {
  return (
    <ul className="ImageGallery">
      {pics.map(item => (
        <GalleryItem
          key={item.id}
          image={item.webformatURL}
          fullImage={item.largeImageURL}
        />
      ))}
    </ul>
  );
};

ImmageGallery.propTypes = {
  pics: PropTypes.arrayOf(PropTypes.object),
};

export default ImmageGallery;
