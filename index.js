import express from "express";
import { moviesRouter } from './routers/movies.js';
import { corsMiddleware } from './middlewares/cors.js';
const app = express();
const port = process.env.PORT ?? 3000;
app.disable('x-powered-by');
app.use(express.json());
app.use(corsMiddleware());
app.use('/movies', moviesRouter);
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
    res.send(`<html><head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
    }

    h1 {
      color: #333;
      text-align: center;
      padding: 20px 0;
    }

    p {
      color: #666;
      margin: 20px;
    }

    a {
      margin: 10px 20px;
      color: #0088cc;
      text-decoration: none;
    }

    a:hover {
      color: #005599;
    }

  </style>
  </head><body><h1>Bienvenido</h1>
  <p>Esta es la api de movies</p>
  <a href="/movies/Catalogo">Consulta las peliculas</a>
  <a href="/movies">API info</a></body></html>`);
});
// la última a la que va a llegar
app.use((req, res) => {
    res.status(404).send('<h1>Error 404: Page not found</h1>');
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
