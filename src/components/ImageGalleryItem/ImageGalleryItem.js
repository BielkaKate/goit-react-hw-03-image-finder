import s from './ImageGalleryItem.module.css';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  LargeImageModal = largeImageURL => {
    this.props.onClick(largeImageURL);
  };

  render() {
    return this.props.imagesArray.map(({ id, webformatURL, largeImageURL }) => (
      <li
        key={id}
        className={s.ImageGalleryItem}
        onClick={() => this.LargeImageModal(largeImageURL)}
      >
        <img className={s.image} src={webformatURL} alt="" />
      </li>
    ));
  }
}

export default ImageGalleryItem;
