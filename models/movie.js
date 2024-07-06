var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';
import { ValidateMovie, validateParcialMovie } from "../schemas/schemaMovie.js";
const Require = createRequire(import.meta.url);
const movies = Require('../pokemon/movies.json');
export class MovieModel {
}
_a = MovieModel;
MovieModel.getAll = () => __awaiter(void 0, void 0, void 0, function* () { return movies; });
MovieModel.getByGender = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const querys = JSON.parse(JSON.stringify(request.query));
    const { genre, title, director, year, rating, poster } = querys;
    let filteredMovies = movies;
    if (genre) {
        filteredMovies = filteredMovies.filter((movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
    }
    if (title) {
        filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase() === title.toLowerCase());
    }
    if (director) {
        filteredMovies = filteredMovies.filter((movie) => movie.director.toLowerCase() === director.toLowerCase());
    }
    if (year) {
        filteredMovies = filteredMovies.filter((movie) => movie.year === Number(year));
    }
    if (rating) {
        filteredMovies = filteredMovies.filter((movie) => movie.rate === Number(rating));
    }
    if (poster) {
        filteredMovies = filteredMovies.filter((movie) => movie.poster === poster);
    }
    return filteredMovies;
});
MovieModel.getByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundMovie = movies.find((movie) => movie.id === id);
    return foundMovie ? foundMovie : false;
});
MovieModel.create = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const isValid = ValidateMovie(data);
    if (!isValid) {
        return false;
    }
    const newMovie = Object.assign({ id: randomUUID() }, data);
    movies.push(newMovie);
    return newMovie;
});
MovieModel.update = (id, request) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, year, director, genre, rate } = request.body;
    const foundMovie = movies.find((movie) => movie.id === id);
    if (!foundMovie) {
        return false;
    }
    const isValid = validateParcialMovie(request.body);
    if (!isValid.success) {
        return false;
    }
    if (title) {
        foundMovie.title = title;
    }
    if (year) {
        foundMovie.year = year;
    }
    if (director) {
        foundMovie.director = director;
    }
    if (genre) {
        foundMovie.genre = genre;
    }
    if (rate) {
        foundMovie.rate = rate;
    }
    return foundMovie;
});
MovieModel.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundMovie = movies.find((movie) => movie.id === id);
    if (!foundMovie) {
        return false;
    }
    const movieIndex = movies.indexOf(foundMovie);
    if (movieIndex === -1) {
        return false;
    }
    movies.splice(movieIndex, 1);
    return true;
});
