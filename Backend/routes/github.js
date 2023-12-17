/**
 * Importa la biblioteca express,
 * los controladores de github.
 */
import express from "express";
import { getRepos, getCommits } from "../controllers/github.js"

// El enrutador para las rutas
const router = express.Router();

// Ruta para obtener los repositorios
router.get('/', getRepos);

// Ruta para obtener los commits
router.get('/:repo', getCommits );

// Exporta el enrutador de autentificación.
export default router;