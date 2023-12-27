import express from 'express'

import { Cors } from './middlewares/cors.js'
import { Require } from './Require.js'
import { MovieModel } from './models/movie.js'

import { randomUUID } from 'node:crypto'

const movies = Require('./pokemon/movies.json')
const app = express()
const port = 3000

app.disable('x-powered-by')

app.use(express.json())
app.use(Cors())

{ // { /* app.use((req, res, next) => {
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
// })*/}
}

app.get('/', (req, res) => {
  res.send('<h1>Pagina Principal</h1>')
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/filter', async (req, res) => {
  const { genre, title, director, year, poster, rate } = req.query
  
  const movies = await MovieModel.getAll({title, director, year, rate, genre, poster})
}
)

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const foundMovie = MovieModel.getByID(id)
  if (foundMovie) { res.status(302).send(foundMovie) } else { res.status(400).send('id no valida') }
})

app.post('/movies', (req, res) => {
  const data = req.body
  const NewMovie = MovieModel.add(data)
  if(NewMovie){
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
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex > 0) {
    movies.splice(movieIndex, 1)
    res.send(movies)
  }
})

// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>Error 404: Page not found</h1>')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
