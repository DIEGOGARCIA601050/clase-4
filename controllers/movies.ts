import { MovieModel } from '../models/movie.js'

export class MovieController {
  static getAll = async (req, res) => {
    const movies = await MovieModel.getAll();
    try {
      let Movies = movies
      res.json(Movies)
    } catch {
      res.status(500).json({
        message: "Error interno del servidor"
      })
    }
  }
  static getById = async (req, res) => {
    const { id } = req.params
      const foundMovie = await MovieModel.getByID({ id })
    try {
      const movie = await foundMovie;
      res.status(302).json(movie);
    } catch (error) {
      console.error('Error finding movie:', error);
      res.status(400).send('id no valida');
    }
  }
  static getByQuery = async (req, res) => {
    try {
      const movie = await MovieModel.getByGender({ request: req });
      res.status(302).json(movie);
    } catch (error) {
      console.error('Error finding movie:', error);
      res.status(400).send(`Error al buscar la pelicula: ${error.message}`);
    }
  }
  static create = async (req, res) => {
    const NewMovie = MovieModel.create({ request: req })
    try {
      const movie = await NewMovie;
      res.status(201).json(movie);
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(400).send('Error al crear la pelicula');
    }
  }
  static update = async (req, res) => {
    const { id } = req.params
    const ModifMovie = await MovieModel.update({ id, request: req })
    try {
      const movie =  ModifMovie;
      res.status(202).json(movie);
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(400).send('Error al actualizar la pelicula');
    }
  }
  static delete = async (req, res) => {
    const { id } = req.params
    const resultado = await MovieModel.delete({ id })
    try {
      res.status(202).json(resultado);
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(400).send('Error al eliminar la pelicula');
    }
  }
}