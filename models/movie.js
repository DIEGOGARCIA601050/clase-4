import { createRequire } from 'node:module'
const Require = createRequire(import.meta.url)
const movies = Require('../pokemon/movies.json');
export class MovieModel {
  static getByGender = async (request) => {
    const {title, year, director, poster, genre, rate} = request.body;
    
    if (genre) {
      return movies.filter(
        movie => {
          movie.some(genre => genre.toLowerCase() === movie.genre.toLowerCase())
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
      if(rate) {
        return movies.filter(movie => movie.rating === rating)
      }
      if(poster) {
        return movies.filter(movie => movie.poster === poster)
      }
    }
  static getByID = async (id) => {
    const foundMovie = movies.find(movie => movie.id === id)
      if (Object.keys(foundMovie).length === 0) { return false } else { return foundMovie }
    }
  }
  