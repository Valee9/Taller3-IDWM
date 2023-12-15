/**
 * Importa la biblioteca express,
 * los controladores del admin.
 */
import express from 'express';
import { getAdmin, createAdmin, getAdminByRut, updateAdminByRut } from '../controllers/admin.js';
// El enrutador para las rutas
const router = express.Router();

// Ruta para obtener los admin
router.get('/', getAdmin);

// Ruta para obtener un admin por su rut
router.get('/:rut', getAdminByRut);

// Ruta para actualizar un admin por su rut
router.put('/:rut', updateAdminByRut);

// Ruta para crear un nuevo admin
router.post('/', createAdmin);

// Exporta el enrutador de admin.
export default router;