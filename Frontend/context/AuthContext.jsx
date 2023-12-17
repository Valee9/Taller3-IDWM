// Importa react, AuthReducer y axios
import React, { createContext, useReducer } from 'react'
import { AuthReducer } from './AuthReducer';
import axios from "axios";

// Estado inicial del contexto
const authInitialState = {
  // Status = checking, authenticated, not-authenticated
  status: 'checking',
  token: null,
  user: null,
  errorMessage: null,
  rut: null,
}
// Crear el contexto
export const AuthContext = createContext();

// Crear Provider
export const AuthProvider = ({ children }) => {
  // Utiliza el reducer para manejar el estado de autenticación
  const [state, dispatch] = useReducer(AuthReducer, authInitialState);
  // Función para realizar el registro de un nuevo administrador  
  const signUp = async ({ email, name, year, rut }) => {
    try {
      // Realiza una solicitud al servidor para registrar un nuevo administrador
      const response = await axios.post('http://localhost:3001/admin', { email, name, year, rut });
      // Actualiza el estado después de un registro exitoso
      dispatch({
        type: 'checking',
        payload: {
          token: response.data.token,
          user: response.data.user,
          rut: response.data.rut,
        }
      });
      // Retorna un objeto con éxito y datos
      return { success: true, data: response.data };
    } catch (error) {
      // Actualiza el estado con un mensaje de error en caso de fallo en el registro
      dispatch({
        type: 'setError',
        payload: {
          errorMessage: 'Hubo un error en el registro.'
        }
      });
      // Retorna un objeto con fallo y mensaje de error
      return { success: false, error: 'Hubo un error en el registro.' };
    }
  };
  // Función para realizar el inicio de sesión
  const signIn = async ({ email, password }) => {
    try {
      // Realiza una solicitud al servidor para iniciar sesión
      const response = await axios.post('http://localhost:3001/auth', { email, password });
      // Actualiza el estado después de un inicio de sesión exitoso
      dispatch({
        type: 'signUp',
        payload: {
          token: response.data.token,
          user: response.data.admin,
          rut: response.data.admin.rut,
        }
      });
       // Retorna un objeto con éxito y datos
      return { success: true, data: response.data };
    } catch (error) {
      // Actualiza el estado con un mensaje de error en caso de fallo en el inicio de sesión
      dispatch({
        type: 'setError',
        payload: {
          errorMessage: 'Hubo un error en el inicio de sesión.'
        }
      });
      // Retorna un objeto con fallo y mensaje de error
      return { success: false, error: 'Hubo un error en el inicio de sesión.' };
    }
  };
  // Función para cerrar sesión
  const logOut = async () => {
    // Actualiza el estado para realizar el cierre de sesión
    dispatch({
      type: 'logout',
    })
  }
  // Función para remover el mensaje de error
  const removeError = () => {
    // Actualiza el estado para eliminar el mensaje de error
    dispatch({
      type: 'removeError'
    })
  }
  // Retorna el contexto de autenticación y sus funciones alrededor de los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        ...state,
        errorMessage: state.errorMessage,
        signIn,
        signUp,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}