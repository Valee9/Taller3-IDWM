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

  const [state, dispatch] = useReducer(AuthReducer, authInitialState);

  const signUp = async ({ email, name, year, rut }) => {
    console.log(email, name, year, rut);
    try {
      const response = await axios.post('http://localhost:3001/admin', { email, name, year, rut });
      console.log(response.created);
      dispatch({
        type: 'checking',
        payload: {
          token: response.data.token,
          user: response.data.user,
          rut: response.data.rut,
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: 'setError',
        payload: {
          errorMessage: 'Hubo un error en el registro.'
        }
      });
      return { success: false, error: 'Hubo un error en el registro.' };
    }
  };


  const signIn = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:3001/auth', { email, password });
      console.log(response.data.token);
      console.log(response.data.admin);
      dispatch({
        type: 'signUp',
        payload: {
          token: response.data.token,
          user: response.data.admin,
          rut: response.data.admin.rut,
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: 'setError',
        payload: {
          errorMessage: 'Hubo un error en el inicio de sesión.'
        }
      });
      return { success: false, error: 'Hubo un error en el inicio de sesión.' };
    }
  };

  const logOut = async () => {
    dispatch({
      type: 'logout',
    })
  }

  const removeError = () => {
    dispatch({
      type: 'removeError'
    })
  }

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