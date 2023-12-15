// Importación del módulo de 'mongoose' para la base de datos de MongoDB
import mongoose from "mongoose";

//Esquema de datos para la colección 'Admin'
const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    year: {  type: Number, required: true},
    rut: { type: String, unique: true, required: true },
    password: { type: String, required: true, bcrypt: true }
})

// Exportación del modelo Admin
export default mongoose.model("Admin",adminSchema);