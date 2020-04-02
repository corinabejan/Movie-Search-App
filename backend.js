const app = require("express")();
const fetch = require("node-fetch");

const key = "70012461";
const port = 3001;

app.get("/api/:query", async (req, res) => {
  // IMDB
  const data = await (
    await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${req.params.query}`)
  ).json();

  // IDs
  let movieIds = [];
  if (data.Search) {
    movieIds = data.Search.map(movie => movie.imdbID);
  }

  // Full description
  let moviesData = movieIds.map(id =>
    fetch(`https://www.omdbapi.com/?apikey=${key}&i=${id}&plot=full`)
  );
  moviesData = await Promise.all(moviesData);
  moviesData = moviesData.map(data => data.json());
  moviesData = await Promise.all(moviesData);

  moviesData = moviesData.map(movieData => {
    const { Title, Released, Genre, Plot, Poster, imdbRating, imdbID } = movieData;
    return {
      Title,
      Released,
      Genre,
      Plot,
      Poster,
      imdbRating,
      imdbID
    };
  });

  res.send(moviesData).end();
});

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);
