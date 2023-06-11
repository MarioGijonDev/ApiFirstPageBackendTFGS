
// IMPORTS
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'

const { Schema, model } = mongoose;

// Creamos el esquema del usuario
// Contiene los campos de cada usuario
const userSchema = new Schema({
  name: {
    type: String, // Cadena de texto
    required: true, // El campo obligatorio
    trim: true, // Se eliminan los espacios en blanco alrededor del valor
    lowercase: true, // El valor se convierte en minúsculas
    index: { unique: true } // Se crea un índice único para este campo
  },
  email:{
    type: String, // Cadena de texto
    required: true, // El campo es obligatorio
    trim: true, // Se eliminan los espacios en blanco alrededor del valor
    unique: true, // El valor debe ser único
    lowercase: true, // El valor se convierte en minúsculas
    index: { unique: true }, // Se crea un índice único para este campo
    useCreateIndex: true, // Se utiliza createIndex en lugar de ensureIndex
    autoIndex: true // Los índices se crean automáticamente
  },
  password: {
    type: String, // Cadena de texto
    required: true // El campo es obligatorio
  }
});

// Esta función se ejecutará siempre que se genere un registro en la base de datos
// Usamos una función "Mandatory" en vez de una función flecha para hacer uso del this
// Realizar hash a la contraseña
userSchema.pre("save", async function(next){
  // Si la contraseña no ha sido modificada, pasa al siguiente middleware
  // Esto es útil para saber si se está modificando el usuario, o creando uno nuevo
  if(!this.isModified('password')) return next()
  try {
    // Obtenemos la sal para el cifrado
    const salt = await bcryptjs.genSalt(10);
    // Hasheamos/ectriptamos la contraseña
    this.password = await bcryptjs.hash(this.password, salt);
    // Pasamos al siguiente middleware
    next();
  } catch (e) {
    // En caso de error, lanzamos una excepción con un mensaje de información
    throw new Error('Failed on hashing password');
  }
});

// Esta función pertenecerá al schema (instancia del módulo/usuario)
// Usamos una función "Mandatory" en vez de una función flecha para hacer uso del this
// Compara dos contraseñas para comprobar que la contraseña asociada al usuario es correcta
userSchema.methods.comparePassword = async function(candidatePassword) {
  // Devuelve true si son iguales, false si no lo son
  return await bcryptjs.compare(candidatePassword, this.password);
}
// Creamos un modelo, que funcionará como una tabla en una base de datos relacional
// Cada instancia del modelo, debe tener la estructura especificada en el schema
export const User = model('User', userSchema);


