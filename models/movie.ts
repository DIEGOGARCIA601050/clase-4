import { Request, Response } from "express";
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { ValidateMovie, validateParcialMovie } from '../schemas/schemaMovie.js'
const Require = createRequire(import.meta.url)
const movies = Require('../pokemon/movies.json');
type DittoID = `${string}-${string}-${string}-${string}-${string}`;
type Ditto = {
    id: DittoID
    title: string
    year: number
    director: string
    genre: string[]
    rate: number
    poster: string
    timestamp: number
}

export class MovieModel {
  static getAll = async () => movies
  static getByGender = async ({ request }:{request:any}) => {
    const { title, year, director, poster, genre, rate } = request.query;

    let filteredMovies = movies;

    if (genre) {
      filteredMovies = filteredMovies.filter((movie:Ditto)=> movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
    }
    if (title) {
      filteredMovies = filteredMovies.filter((movie:Ditto)=> movie.title.toLowerCase() === title.toLowerCase());
    }
    if (director) {
      filteredMovies = filteredMovies.filter((movie:Ditto)=> movie.director.toLowerCase() === director.toLowerCase());
    }
    if (year) {
      filteredMovies = filteredMovies.filter((movie:Ditto)=> movie.year === year);
    }
    if (rate) {
      filteredMovies = filteredMovies.filter((movie:Ditto)=> movie.rate === rate);
    }
    if (poster) {
      filteredMovies = filteredMovies.filter((movie:Ditto)=> movie.poster === poster);
    }

    return filteredMovies;
  }

  static getByID = async ({ id }:{id:DittoID}) => {
    const foundMovie = movies.find((movie:Ditto)=> movie.id === id)
      if (Object.keys(foundMovie).length === 0) { return false } else { return foundMovie }
    }
  static create = async ({ request }:{request:Request}) => {
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
  static update = async ({ id, request }:{id:DittoID,request:Request}) => {
    const { title, year, director, genre, rate } = request.body;
    const foundMovie = movies.find((movie:Ditto)=> movie.id === id)
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
  static delete = async ({ id }:{id:DittoID}) => {
    const foundMovie = movies.find((movie:Ditto)=> movie.id === id)
    if (!foundMovie) { return false }
    const movieIndex = movies.indexOf(foundMovie)
    if (movieIndex === -1) { return false }
    movies.splice(movieIndex, 1)
    return true
  }
  }
  