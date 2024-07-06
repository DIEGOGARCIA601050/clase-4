var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MovieModel } from '../models/movie.js';
export class MovieController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield MovieModel.getAll();
                res.status(200).json(movies);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error interno del servidor',
                });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const movie = yield MovieModel.getByID(id);
                if (!movie) {
                    res.status(404).json({ message: 'Película no encontrada' });
                }
                else {
                    res.status(200).json(movie);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error interno del servidor',
                });
            }
        });
    }
    static getByQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield MovieModel.getByGender({ request: req });
                res.status(200).json(movies);
            }
            catch (error) {
                res.status(500).json({
                    message: `Error al buscar la película: ${error.message}`,
                });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMovie = yield MovieModel.create({ request: req });
                res.status(201).json(newMovie);
            }
            catch (error) {
                res.status(400).json({
                    message: 'Error al crear la película',
                });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const updatedMovie = yield MovieModel.update({ id, request: req });
                if (!updatedMovie) {
                    res.status(404).json({ message: 'Película no encontrada' });
                }
                else {
                    res.status(202).json(updatedMovie);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al actualizar la película',
                });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const result = yield MovieModel.delete(id);
                if (!result) {
                    res.status(404).json({ message: 'Película no encontrada' });
                }
                else {
                    res.status(202).json(result);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar la película',
                });
            }
        });
    }
}
