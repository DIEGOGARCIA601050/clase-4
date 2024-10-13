import cors, { CorsOptions } from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
  'https://clase-4.chetoel.repl.co',
  'https://clase-4.chetoel.repl.co/movies/Catalogo',
  'http://34.139.212.28',
  'http://34.139.212.28:8080',
  'http://34.139.212.28:3000',
  'http://localhost:3000',
  'https://clase-4.chetoel.repl.co',
  'https://clase-4--chetoel.repl.co'
];

export const corsMiddleware = (options: CorsOptions = {}) => cors({
  origin: (origin: string | undefined, callback: cors.CorsCallback) => {
    console.log('Request Origin:', origin); // Log the origin for debugging purposes
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Disallow the request
    }
  },
  ...options
});
