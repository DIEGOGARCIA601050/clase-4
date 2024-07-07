import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost:3001',
  user: 'Diego',
  password: '51L46U34',
  database: 'Imagenes'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

export default connection;
