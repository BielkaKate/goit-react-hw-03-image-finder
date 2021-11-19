import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    value: PropTypes.string,
    images: PropTypes.array,
    page: PropTypes.number,
    searchValue: PropTypes.string,
    loading: PropTypes.bool,
    showModal: PropTypes.bool,
    largeImeges: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalOnEscape);
  }

  closeModalOnEscape = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onModalClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.onOverlayClick}>
        <div className={s.modal}>
          <img src={this.props.modalImg} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
