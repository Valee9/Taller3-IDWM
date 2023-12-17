// Importa el modelo 'Admin' que representa la estructura de datos para los clientes.
import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';

/**
 * Obtiene el admin almacenado en la base de datos.
 * @async
 * @function getAdmins
 * @param {object} req - Objeto de solicitud (request).
 * @param {object} res - Objeto de respuesta (response).
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 * @throws {object} - Objeto que indica un error si la operación no tiene éxito.
 */
export const getAdmin = async (req, res) => {

  try {
    // Realiza una consulta para obtener el admin de la base de datos.
    const admins = await Admin.find({}, { password: 0 });
    // Envía una respuesta con el array de admin obtenido.
    res.status(200).send(admins);
  } catch (error) {
    // Envía una respuesta de error si ocurre algún problema durante la operación.
    res.status(500).json({ message: error.message });
  }
}

export const createAdmin = async (req, res) => {
  // Obtiene los datos del nuevo admin del cuerpo de la solicitud.
  const { email, name, year, rut } = req.body;

  try {
    // Verifica si se está intentando crear un admin sin email, nombre, año o rut.
    if (!email || !name || !year || !rut) {
      return res.status(400).json({ created: false, message: 'Faltan datos obligatorios.' });
    }
    const salt = await bcrypt.genSalt();
    // Genera el hash de la contraseña utilizando el algoritmo bcrypt.
    const password = await bcrypt.hash(rut, salt);
    // Crea un nuevo admin en la base de datos utilizando el modelo 'Admin'.
    const newAdmin = await Admin.create({ email, name, year, rut, password });
    // Envía una respuesta indicando que el admin se creó con éxito.
    res.status(201).json({ created: true, admin: newAdmin });
  } catch (error) {
    // Envía una respuesta de error si ocurre algún problema durante la creación del admin.
    res.status(500).json({ created: false, message: error.message });
  }
}

export const getAdminByRut = async (req, res) => {
  const { rut } = req.params;

  try {
    // Busca el administrador en la base de datos por rut.
    const admin = await Admin.findOne({ rut: rut });

    // Verifica si el administrador fue encontrado.
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Envía una respuesta con la información del administrador.
    res.status(200).json(admin);
  } catch (error) {
    // Envía una respuesta de error si ocurre algún problema durante la búsqueda del administrador.
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminByRut = async (req, res) => {
  const { rut } = req.params;
  const updates = req.body;

  try {
    if (updates.password !== undefined ) {
      // Genera un nuevo hash de contraseña.
      const salt = await bcrypt.genSalt();
      const newPasswordHash = await bcrypt.hash(updates.password, salt);

      // Actualiza la contraseña en las actualizaciones.
      updates.password = newPasswordHash;
    }
    // Busca y actualiza el administrador en la base de datos.
    const updatedAdmin = await Admin.findOneAndUpdate({ rut: rut }, updates, { new: true });

    // Verifica si el administrador fue encontrado y actualizado con éxito.
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not updated" });
    }

    // Envía una respuesta indicando que el administrador se actualizó con éxito.
    res.status(200).json({ message: "Admin actualizado correctamente", continue: true });
  } catch (error) {
    // Envía una respuesta de error si ocurre algún problema durante la actualización del administrador.
    res.status(400).json({ message: error.message });
  }
};
