import React from 'react';
import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  state = { searchInput: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => this.setState({ searchInput: e.currentTarget.value });

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchInput.trim() === '') {
      alert('Please enter a valid request!');
      return;
    }

    this.props.onSubmit(this.state.searchInput);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
