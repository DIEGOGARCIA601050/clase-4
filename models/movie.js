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
import { ValidateMovie, validateParcialMovie } from '../schemas/schemaMovie.js';
const Require = createRequire(import.meta.url);
const movies = Require('../pokemon/movies.json');
export class MovieModel {
}
_a = MovieModel;
MovieModel.getAll = () => __awaiter(void 0, void 0, void 0, function* () { return movies; });
MovieModel.getByGender = (_b) => __awaiter(void 0, [_b], void 0, function* ({ request }) {
    const { title, year, director, poster, genre, rate } = request.query;
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
        filteredMovies = filteredMovies.filter((movie) => movie.year === year);
    }
    if (rate) {
        filteredMovies = filteredMovies.filter((movie) => movie.rate === rate);
    }
    if (poster) {
        filteredMovies = filteredMovies.filter((movie) => movie.poster === poster);
    }
    return filteredMovies;
});
MovieModel.getByID = (_c) => __awaiter(void 0, [_c], void 0, function* ({ id }) {
    const foundMovie = movies.find((movie) => movie.id === id);
    if (Object.keys(foundMovie).length === 0) {
        return false;
    }
    else {
        return foundMovie;
    }
});
MovieModel.create = (_d) => __awaiter(void 0, [_d], void 0, function* ({ request }) {
    const data = request.body;
    const Valider = ValidateMovie(data);
    if (!Valider) {
        return false;
    }
    const NewMovie = Object.assign({ id: randomUUID() }, data);
    movies.push(NewMovie);
    return NewMovie;
});
MovieModel.update = (_e) => __awaiter(void 0, [_e], void 0, function* ({ id, request }) {
    const { title, year, director, genre, rate } = request.body;
    const foundMovie = movies.find((movie) => movie.id === id);
    if (!foundMovie) {
        return false;
    }
    const Valider = validateParcialMovie(request.body);
    if (!Valider.success) {
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
});
MovieModel.delete = (_f) => __awaiter(void 0, [_f], void 0, function* ({ id }) {
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
