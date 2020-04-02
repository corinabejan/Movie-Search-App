import React from "react";
import Movie from "./Movie";
import fetch from "node-fetch";

class Movies extends React.Component {
  constructor() {
    super();
    this.state = { searchTerm: "", moviesData: [] };
  }

  handleChange = async event => {
    this.setState({
      searchTerm: event.target.value
    });

    const query = encodeURI(event.target.value);
    const data = await (await fetch(`/api/${query}`)).json();
    this.setState({ moviesData: data });
  };

  render() {
    const { moviesData } = this.state;

    return (
      <div>
        <div id="search-bar-wrapper">
          <input
            value={this.state.searchTerm}
            placeholder="Search for a movie..."
            onChange={this.handleChange}
          />
        </div>
        {moviesData.length > 0 ? (
          moviesData.map((movieData, key) => (
            <Movie movieData={movieData} key={key} />
          ))
        ) : (
          <p>
            Couldn't find any movie. Please search again using another search
            criteria.
          </p>
        )}
      </div>
    );
  }
}

export default Movies;
