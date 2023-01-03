import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ close, fullImage }) => {
  const buttonClose = e => {
    if (e.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', buttonClose);
    return () => {
      document.removeEventListener('keydown', buttonClose);
    };
  });

  return (
    <div
      className="Overlay"
      tabIndex={0}
      onKeyDown={buttonClose}
      onClick={close}
    >
      <div className="Modal">
        <img src={fullImage} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  fullImage: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
