import Require from '../Require.js';
import { ValidateMovie } from './schemas/schemaMovie.js'
const movies = Require('../pokemon/movies.js');
export class MovieModel {
  static getAll = async ({title, director, year, rating, genres, poster}) => {
    if (genres) {
      return movies.filter(
        movie => {
          movie.some(genre => genre.toLowerCase() === movie.genres.toLowerCase())
        })}
      if (title) {
        return movies.filter(movie => movie.title.toLowerCase() === title.toLowerCase())
      }
      if(director) {
        return movies.filter(movie => movie.director.toLowerCase() === director.toLowerCase())
      }
      if (year) {
        return movies.filter(movie => movie.year === year)
      }
      if(rating) {
        return movies.filter(movie => movie.rating === rating)
      }
      if(poster) {
        return movies.filter(movie => movie.poster === poster)
      }
    }
  static getByID = async ({id}) => {
    movies = movies.filter(movie => movie.id === id)
    return movies
  }
  static add = async (datos) => {
    const Vali = ValidateMovie(datos)
    if (Vali.success) {
      // 422 Unprocesable Entity
      // en base de datos
      const NewMovie = {
        id: randomUUID(),
        ...datos
      }
      movies.push(NewMovie)
      return NewMovie
    }
  }
  }