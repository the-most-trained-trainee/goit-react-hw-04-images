import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  static propTypes = {
    fullImage: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.buttonClose);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.buttonClose);
  }

  buttonClose = e => {
    if (e.key === 'Escape') {
      this.props.close();
    }
  };

  render() {
    return (
      <div
        className="Overlay"
        tabIndex={0}
        onKeyDown={this.buttonClose}
        onClick={this.props.close}
      >
        <div className="Modal">
          <img src={this.props.fullImage} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
