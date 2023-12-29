import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { ValidateMovie, validateParcialMovie } from '../schemas/schemaMovie.js'
const Require = createRequire(import.meta.url)
const movies = Require('../pokemon/movies.json');
export class MovieModel {
  static getAll = async () => movies
  static getByGender = async ({ request }) => {
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

  static getByID = async ({ id }) => {
    const foundMovie = movies.find(movie => movie.id === id)
      if (Object.keys(foundMovie).length === 0) { return false } else { return foundMovie }
    }
  static create = async ({ request }) => {
    const data = request.body;
    const Valider = ValidateMovie(data)
    if(!Valider) {
      return false
    }
    const NewMovie = {
      id: randomUUID(),
      ...data
    }
    movies.push(NewMovie)
    return NewMovie
  }
  static update = async ({ id, request }) => {
    const { title, year, director, genre, rate } = request.body;
    const foundMovie = movies.find(movie => movie.id === id)
    if (!foundMovie) { return false }
    const Valider = validateParcialMovie(request.body)
    if (!Valider.success) { return false }
    if(title) {
      foundMovie.title = title
    }
    if(year) {
      foundMovie.year = year
    }
    if(director) {
      foundMovie.director = director
    }
    if(genre) {
      foundMovie.genre = genre
    }
    if(rate) {
      foundMovie.rate = rate
    }
  }
  static delete = async ({ id }) => {
    const foundMovie = movies.find(movie => movie.id === id)
    if (!foundMovie) { return false }
    const movieIndex = movies.indexOf(foundMovie)
    if (movieIndex === -1) { return false }
    movies.splice(movieIndex, 1)
    return true
  }
  }
  
