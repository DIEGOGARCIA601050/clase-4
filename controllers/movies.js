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
import { MovieModel } from '../models/movie.js';
export class MovieController {
}
_a = MovieController;
MovieController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield MovieModel.getAll();
    try {
        let Movies = movies;
        res.json(Movies);
    }
    catch (_b) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});
MovieController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundMovie = yield MovieModel.getByID({ id });
    try {
        const movie = yield foundMovie;
        res.status(302).json(movie);
    }
    catch (error) {
        console.error('Error finding movie:', error);
        res.status(400).send('id no valida');
    }
});
MovieController.getByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield MovieModel.getByGender({ request: req });
        res.status(302).json(movie);
    }
    catch (error) {
        console.error('Error finding movie:', error);
        res.status(400).send(`Error al buscar la pelicula: ${error.message}`);
    }
});
MovieController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const NewMovie = MovieModel.create({ request: req });
    try {
        const movie = yield NewMovie;
        res.status(201).json(movie);
    }
    catch (error) {
        console.error('Error creating movie:', error);
        res.status(400).send('Error al crear la pelicula');
    }
});
MovieController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ModifMovie = yield MovieModel.update({ id, request: req });
    try {
        const movie = ModifMovie;
        res.status(202).json(movie);
    }
    catch (error) {
        console.error('Error updating movie:', error);
        res.status(400).send('Error al actualizar la pelicula');
    }
});
MovieController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resultado = yield MovieModel.delete({ id });
    try {
        res.status(202).json(resultado);
    }
    catch (error) {
        console.error('Error deleting movie:', error);
        res.status(400).send('Error al eliminar la pelicula');
    }
});
