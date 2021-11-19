import React from 'react';
import s from './Searchbar.module.css';
import { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loaderhearts from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const API_Key = '23544222-01ada114d06f3f80b4f13a1dd';

class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string,
    images: PropTypes.array,
    page: PropTypes.number,
    searchValue: PropTypes.string,
    loading: PropTypes.bool,
    showModal: PropTypes.bool,
    largeImege: PropTypes.string,
  };

  state = {
    value: '',
    searchValue: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    largeImage: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      if (prevState.value !== this.state.value) {
        this.setState({
          loading: true,
        });
      }
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${API_Key}&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then(response => {
          if (response.status === 200) {
            this.setState(prevState => ({
              images: [...prevState.images, ...response.data.hits],
            }));
            this.setState({ loading: false });
            if (this.state.images.length > 11) {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
            }
          }
          if (response.status === 400) {
            this.setState({ eror: 'картинки по вашему зыпросу не найдены' });
          }
        })
        .catch(error => console.error(error));
    }
  }

  reset() {
    this.setState({ value: '' });
  }
  onChangeHandler = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return;
    }
    if (this.state.value.trim() === this.state.searchValue) {
      this.setState({ page: 1, images: [] });
    }
    this.setState({ searchValue: this.state.value });
    this.setState({
      loading: true,
    });

    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=${API_Key}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ images: response.data.hits });
          if (this.state.images.length === 0) {
            toast.error('По такому запросу картинки не найденны!');
          }
        }
        this.setState({
          loading: false,
        });
        if (response.status === 400) {
          this.setState({ error: 'картинки по вашему зыпросу не найдены' });
        }
      })
      .catch(error => console.error(error));

    this.props.onSubmit(this.state);
    this.reset();
  };

  onLoadMoreClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onItemClick = e => {
    this.setState({ largeImage: e });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    return (
      <section>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={this.onSubmitHandler}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.buttonLabel}>Search</span>
            </button>

            <input
              onChange={this.onChangeHandler}
              className={s.input}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </form>
          {this.state.loading && <Loaderhearts />}
        </header>
        {this.state.images.length !== 0 && (
          <ImageGallery>
            <ImageGalleryItem
              imagesArray={this.state.images}
              onClick={this.onItemClick}
            />
          </ImageGallery>
        )}
        {this.state.images.length !== 0 && (
          <Button text="Load more" onClick={this.onLoadMoreClick} />
        )}
        {this.state.showModal && (
          <Modal
            onModalClose={this.toggleModal}
            modalImg={this.state.largeImage}
          />
        )}
      </section>
    );
  }
}

export default Searchbar;
