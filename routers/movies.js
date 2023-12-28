import { Router } from "express";

import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { MovieModel } from '../models/movie.js'

const Require = createRequire(import.meta.url)

const movies = Require('../pokemon/movies.json')
export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
  res.json(movies)
})

moviesRouter.get('/Catalogo', (req, res) => {
  res.sendFile(resolve('./public/index.html'))
})

moviesRouter.get('/filter', async (req, res) => {
  try {
    const movie = await MovieModel.getByGender(req);
    res.status(302).json(movie);
  } catch (error) {
    console.error('Error finding movie:', error);
    res.status(400).send(`Error al buscar la pelicula: ${error.message}`);
  }
})

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const foundMovie = await MovieModel.getByID(id)
try {
  const movie = await foundMovie;
  res.status(302).json(movie);
} catch (error) {
  console.error('Error finding movie:', error);
  res.status(400).send('id no valida');
}})

moviesRouter.post('/', async (req, res) => {
  const NewMovie = MovieModel.create(req)
  try {
    const movie = await NewMovie;
    res.status(201).json(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(400).send('Error al crear la pelicula');
  }
})

moviesRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const ModifMovie = await MovieModel.update(id, req)
  try {
    const movie = await ModifMovie;
    res.status(202).json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(400).send('Error al actualizar la pelicula');
  }
})

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const resultado = await MovieModel.delete(id)
  try {
    res.status(202).json(resultado);
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(400).send('Error al eliminar la pelicula');
  }
})