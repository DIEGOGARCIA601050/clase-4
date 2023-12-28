import { createRequire } from 'node:module'
const Require = createRequire(import.meta.url)
const movies = Require('../pokemon/movies.json');
export class MovieModel {
  static getByGender = async (request) => {
    const { title, year, director, poster, genre, rate } = request.query;

    let filteredMovies = movies;

    if (genre) {
      filteredMovies = filteredMovies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
    }
    if (title) {
      filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase() === title.toLowerCase());
    }
    if (director) {
      filteredMovies = filteredMovies.filter(movie => movie.director.toLowerCase() === director.toLowerCase());
    }
    if (year) {
      filteredMovies = filteredMovies.filter(movie => movie.year === year);
    }
    if (rate) {
      filteredMovies = filteredMovies.filter(movie => movie.rating === rate);
    }
    if (poster) {
      filteredMovies = filteredMovies.filter(movie => movie.poster === poster);
    }

    return filteredMovies;
  }

  static getByID = async (id) => {
    const foundMovie = movies.find(movie => movie.id === id)
      if (Object.keys(foundMovie).length === 0) { return false } else { return foundMovie }
    }
  }
  