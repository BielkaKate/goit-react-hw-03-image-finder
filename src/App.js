import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import PropTypes from 'prop-types';
import Loaderhearts from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import fetchApi from './services/fetchApi';
import { toast } from 'react-toastify';

class App extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
    images: PropTypes.array,
    page: PropTypes.number,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    showModal: PropTypes.bool,
    largeImege: PropTypes.string,
  };

  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    largeImage: '',
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (searchQuery !== prevState.searchQuery) {
      this.setState({ loading: true });
      this.setState({ page: 1 });

      fetchApi(this.state.searchQuery, this.state.page)
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
    }
  }

  onLoadMoreClick = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({ loading: true });
    fetchApi(this.state.searchQuery, this.state.page)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
          }));
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
  };

  onSubmitHandler = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  onItemClick = largeImageURL => {
    this.setState({ largeImage: largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmitApp={this.onSubmitHandler} />
        {this.state.loading && <Loaderhearts />}
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
        {/* <ImageGallery imageName={this.state.imageName} /> */}
        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

export default App;
