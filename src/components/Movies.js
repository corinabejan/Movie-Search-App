import React from 'react';
// import Movie from './Movie';

class Movies extends React.Component {
  state = {
    moviesList: [],
    searchTerm: ''
  };

  search = event => {
    const key = '70012461';
    event.preventDefault();
    fetch(
        `https://www.omdbapi.com/?apikey=${key}&s=${
        this.state.searchTerm
        }&plot=full`
      )
      .then(res => res.data)
      .then(res => {
        if (!res.Search) {
          this.setState({ moviesList: [] });
          return;
        }

        const moviesList = res.Search.map(movie => movie.imdbID);
        this.setState({
          moviesList
        });
      });
  };

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    const { moviesList } = this.state;

    return (
      <div>
        <form onSubmit={this.search}>
          <input
            placeholder="Search for a movie"
            onChange={this.handleChange}
          />
          <button type="submit"></button>
        </form>
      </div>
    );
  }
}







export default Movies;