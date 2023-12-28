import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
  'https://clase-4.chetoel.repl.co/',
  'https://clase-4.chetoel.repl.co/movies/Catalogo',
  'http://34.139.212.28',
  'http://34.139.212.28:8080',
  'http://34.139.212.28:3000',
  'http://localhost:3000',
  'https://clase-4.chetoel.repl.co'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    console.log('Request Origin:', origin); // Log the origin for debugging purposes
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true); // Allow the request
    }

    if (!origin) {
      return callback(null, true); // Allow requests with no origin (e.g., server-side requests)
    }

    return callback(new Error('Not allowed by CORS')); // Disallow the request
  }
})
