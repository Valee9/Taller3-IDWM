/**
 * Importa la biblioteca express,
 * el controlador de la autentificación.
 */
import express from "express";
import { adminLogin } from "../controllers/auth.js"
// El enrutador para las rutas
const router = express.Router();

// Ruta para enviar las credenciales del administrador en el inicio
router.post("/auth", adminLogin);

// Exporta el enrutador de autentificación.
export default router;