import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return (
    <div>
      <ul className={s.ImageGallery}>{children}</ul>
    </div>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
