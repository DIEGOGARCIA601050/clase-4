import express from 'express'
import cors from 'cors'

import { ValidateMovie, validateParcialMovie } from './schemas/schemaMovie.js'
import { randomUUID } from 'node:crypto'
import { Require } from './Require.js'
import { MovieModel } from './models/movie.js'

const movies = Require('./pokemon/movies.json')
const app = express()
const port = 3000

app.disable('x-powered-by')

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const AceptedOrigins = [
      '*',
      'dominio.example'
    ]
    if (AceptedOrigins.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('No hay cors'))
  }
}))

/* app.use((req, res, next) => {
//   if (req !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   let body = ''
//   req.on('data', chunck => {
//     body += chunck.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     next()
//   })
// guardar req en DB
// isUserLoged()
// Cookies
// })*/

app.get('/', (req, res) => {
  res.send('<h1>Pagina Principal</h1>')
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/filter', async (req, res) => {
  /*if (genre) {
    res.status(302).json(movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())))
  }
  if (title) {
    res.status(302).json(movies.filter(movie => movie.title === title))
  }
  if (director) {
    res.status(302).json(movies.filter(movie => movie.director === director))
  }*/
  try {
    const movie = await MovieModel.getByGender(req);
    res.status(302).json(movie);
  } catch (error) {
    console.error('Error finding movie:', error);
    res.status(400).send(`Error al buscar el libro: ${error.message}`);
  }
})

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params
  const foundMovie = await MovieModel.getByID(id)
try {
  const movie = await foundMovie;
  res.status(302).json(movie);
} catch (error) {
  console.error('Error finding movie:', error);
  res.status(400).send('id no valida');
}})


app.post('/movies', (req, res) => {
  const data = req.body

  const Vali = ValidateMovie(data)
  if (Vali.success) {
    // 422 Unprocesable Entity
    // en base de datos
    const NewMovie = {
      id: randomUUID(),
      ...data
    }
    movies.push(NewMovie)
    // req.body deberíamos guardar en bbdd
    res.status(201).json(NewMovie)
  } else {
    res.status(400).send(`Eror en la info ${Vali.error.message}`)
  }
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validateParcialMovie(req.body)
  if (!result.success) {
    res.status(400).send(result.error.message)
  }
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    res.status(404).send('Peli no encontrada, verifica la URL')
  }
  const UpdateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = UpdateMovie
  return res.json(movies[movieIndex])
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const filtredMovies = M
})

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>Error 404: Page not found</h1>')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})