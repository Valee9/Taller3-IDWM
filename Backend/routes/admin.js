/**
 * Importa la biblioteca express,
 * los controladores del admin.
 */
import express from 'express';
import { getAdmin, createAdmin } from '../controllers/admin.js';
// El enrutador para las rutas
const router = express.Router();

// Ruta para obtener los admin
router.get('/', getAdmin);

// Ruta para crear un nuevo admin
router.post('/', createAdmin);

// Exporta el enrutador de admin.
export default router;