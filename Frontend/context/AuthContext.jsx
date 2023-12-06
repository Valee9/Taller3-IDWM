import React, {createContext, useReducer} from 'react'
import { AuthReducer } from './AuthReducer';

// Estado inicial del contexto
const authInitialState = {
    // Status = checking, authenticated, not-authenticated
    status: 'checking',
    token: null,
    user: null,
    errorMessgae: '',
}

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, authInitialState);

    const signIn = (email = 'val', password = ' vale123') => {
        console.log("email:",email,"password:",password)
    }

    return (
        <AuthContext.Provider
            value={{name: 'Diego',
            signIn
        }}
            >
            {children}
        </AuthContext.Provider>
    )
}