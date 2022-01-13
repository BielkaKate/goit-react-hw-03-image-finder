import React from 'react';
import s from './Searchbar.module.css';
import { Component } from 'react';

import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  state = {
    searchQuery: '',
  };

  onChangeHandler = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmitApp } = this.props;
    if (this.state.searchQuery.trim() === '') {
      return;
    }
    onSubmitApp(searchQuery);
    // this.setState({ searchQuery: '' });
    this.reset();
  };

  reset() {
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmitHandler}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.onChangeHandler}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
