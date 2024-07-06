import { Request, Response } from 'express';
import { MovieModel } from '../models/movie.js';

type DittoID = `${string}-${string}-${string}-${string}-${string}`;

export class MovieController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const movies = await MovieModel.getAll();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({
        message: 'Error interno del servidor',
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const id: DittoID = req.params.id as DittoID;
    try {
      const movie = await MovieModel.getByID({id});
      if (!movie) {
        res.status(404).json({ message: 'Película no encontrada' });
      } else {
        res.status(200).json(movie);
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error interno del servidor',
      });
    }
  }

  static async getByQuery(req: Request, res: Response): Promise<void> {
    try {
      const movies = await MovieModel.getByGender({ request: req });
      res.status(200).json(movies);
    } catch (error: any) {
      res.status(500).json({
        message: `Error al buscar la película: ${error.message}`,
      });
    }
  }

  static async create(req: Request | any, res: Response): Promise<void> {
    try {
      const newMovie = await MovieModel.create({ request: req });
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({
        message: 'Error al crear la película',
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const id: DittoID = req.params.id as DittoID;
    try {
      const updatedMovie = await MovieModel.update({ id, request: req });
      if (!updatedMovie) {
        res.status(404).json({ message: 'Película no encontrada' });
      } else {
        res.status(202).json(updatedMovie);
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al actualizar la película',
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const id: DittoID = req.params.id as DittoID;
    try {
      const result = await MovieModel.delete({id});
      if (!result) {
        res.status(404).json({ message: 'Película no encontrada' });
      } else {
        res.status(202).json(result);
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al eliminar la película',
      });
    }
  }
}