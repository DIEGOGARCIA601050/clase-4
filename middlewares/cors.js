import cors from 'cors'

const AceptedOrigins = [
  '*',
  'dominio.example'
]
export const Cors = ({acceptedOrigins = AceptedOrigins} = {}) => {cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('No hay cors'))
    }
  })}