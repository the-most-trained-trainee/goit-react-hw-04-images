import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ close, fullImage }) => {
  useEffect(() => {
    document.addEventListener('keydown', buttonClose);
    return () => {
      document.removeEventListener('keydown', buttonClose);
    };
  }, []);

  const buttonClose = e => {
    if (e.key === 'Escape') {
      close();
    }
  };

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
