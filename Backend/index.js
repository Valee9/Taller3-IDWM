/**
 * Importación de las bibliotecas necesarias
 */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import adminModel  from './models/admin.js';
import { adminSeeds } from './seeders/admin.js';

// Configura las variables de entorno desde el archivo .env.
dotenv.config();
// Instancia de la aplicación Express.
const app = express();
// Middleware para permitir solicitudes desde cualquier origen (CORS).
app.use(cors());
// Middleware para parsear el cuerpo de las solicitudes como JSON.
app.use(express.json());
// Middleware para el registro de solicitudes utilizando morgan.
app.use(morgan("common"));
// Middleware para parsear el cuerpo de las solicitudes codificado en URL.
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
// Ruta de la API para operaciones relacionadas con el administrador.
app.use('/admin',adminRoutes);
// Ruta de la API para operaciones relacionadas con la autenticación.
app.use('/',authRoutes);
// Puerto en el que se ejecutará el servidor, obtenido desde las variables de entorno o por defecto 6001.
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Instancia de la conexión a la base de datos.
const db = mongoose.connection;
// Manejador de eventos para la conexión exitosa a la base de datos.
db.on('connected', async() => {
  console.log('Conexión correcta a la base de datos');

  try {
    // Elimina todos los documentos existentes y carga el seeder
    await adminModel.deleteMany();
    await adminModel.insertMany(adminSeeds),
    console.log('Datos cargados exitosamente en la base de datos');
  }
  catch (err) {
    console.error('Error al cargar los datos:', err);}
});
// Manejador los errores en la conexión a la base de datos.
db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});
// Inicia el servidor y lo escucha en el puerto especificado.
app.listen(PORT,() => console.log(`Server Port: ${PORT}`));