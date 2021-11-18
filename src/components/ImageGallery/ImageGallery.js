import s from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return (
    <div>
      <ul className={s.ImageGallery}>{children}</ul>
    </div>
  );
};

export default ImageGallery;
