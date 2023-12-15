/**
 * Importa la biblioteca bcrypt para el cifrado de contraseñas,
 * jsonwebtoken para la generación y verificación de tokens JWT
 * y el modelo de datos de administrador desde el módulo correspondiente.
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

/**
 * Maneja la autenticación de un administrador.
 * @async
 * @function adminLogin
 * @param {object} req - Objeto de solicitud (request) de Express que contiene las credenciales del administrador (usuario y contraseña).
 * @param {object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const adminLogin = async (req, res) => {
    try {
        // Extrae las credenciales del cuerpo de la solicitud.
        const { email, password } = req.body;
        // Busca al administrador en la base de datos utilizando el nombre de usuario.
        const admin = await Admin.findOne({ email });
        // Verifica si el administrador no existe o la contraseña no coincide.
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ msg: "Invalis email or password." });
        }
        // Genera un token de autenticación usando el secreto JWT.
        const token = jwt.sign({ rut: admin.rut }, process.env.JWT_SECRET);
        // Envía una respuesta exitosa con el token.
        res.status(200).json({ token, admin});
    } catch (err) {
        // Envía una respuesta de error si ocurre algún problema durante la autenticación.
        res.status(500).json({ error: err.message });
    }
};
