import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
export const moviesRouter = Router()
moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/Catalogo', (req, res) => {
  res.sendFile('/home/clase-4/public/index.html')
})
moviesRouter.get('/filter', MovieController.getByQuery)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.create)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
