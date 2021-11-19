import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    imageName: PropTypes.string,
  };

  state = {
    imageName: '',
  };

  onSubmitHandler = data => {
    this.setState({ imageName: data.value });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmitHandler} />;
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

export default App;
