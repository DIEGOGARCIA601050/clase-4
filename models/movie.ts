import { Request, Response } from 'express';
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { ValidateMovie, validateParcialMovie } from "../schemas/schemaMovie.js";

const Require = createRequire(import.meta.url)
const movies = Require('../pokemon/movies.json');

type DittoID = `${string}-${string}-${string}-${string}-${string}`
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
    static getAll = async (): Promise<Ditto[]> => movies

    static getByGender = async (request: Request): Promise<Ditto[]> => {
        const querys = JSON.parse(JSON.stringify(request.query))
        const { genre, title, director, year, rating, poster } = querys
        let filteredMovies = movies;

        if (genre) {
            filteredMovies = filteredMovies.filter((movie: Ditto) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
        }
        if (title) {
            filteredMovies = filteredMovies.filter((movie: Ditto) => movie.title.toLowerCase() === title.toLowerCase());
        }
        if (director) {
            filteredMovies = filteredMovies.filter((movie: Ditto) => movie.director.toLowerCase() === director.toLowerCase());
        }
        if (year) {
            filteredMovies = filteredMovies.filter((movie: Ditto) => movie.year === Number(year));
        }
        if (rating) {
            filteredMovies = filteredMovies.filter((movie: Ditto) => movie.rate === Number(rating));
        }
        if (poster) {
            filteredMovies = filteredMovies.filter((movie: Ditto) => movie.poster === poster);
        }

        return filteredMovies;
    }

    static getByID = async (id: DittoID): Promise<Ditto | false> => {
        const foundMovie = movies.find((movie: Ditto) => movie.id === id)
        return foundMovie ? foundMovie : false
    }

    static create = async (request: Request): Promise<Ditto | false> => {
        const data = request.body;
        const isValid = ValidateMovie(data)
        if (!isValid) {
            return false
        }
        const newMovie: Ditto = {
            id: randomUUID(),
            ...data
        }
        movies.push(newMovie)
        return newMovie
    }

    static update = async (id: DittoID, request: Request): Promise<Ditto | false> => {
        const { title, year, director, genre, rate } = request.body;
        const foundMovie = movies.find((movie: Ditto) => movie.id === id)
        if (!foundMovie) { return false }
        const isValid = validateParcialMovie(request.body)
        if (!isValid.success) { return false }
        if (title) {
            foundMovie.title = title
        }
        if (year) {
            foundMovie.year = year
        }
        if (director) {
            foundMovie.director = director
        }
        if (genre) {
            foundMovie.genre = genre
        }
        if (rate) {
            foundMovie.rate = rate
        }
        return foundMovie
    }

    static delete = async (id: DittoID): Promise<boolean> => {
        const foundMovie = movies.find((movie: Ditto) => movie.id === id)
        if (!foundMovie) { return false }
        const movieIndex = movies.indexOf(foundMovie)
        if (movieIndex === -1) { return false }
        movies.splice(movieIndex, 1)
        return true
    }
}
