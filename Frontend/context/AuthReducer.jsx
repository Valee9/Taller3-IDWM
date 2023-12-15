import { View, Text } from 'react-native'
import React from 'react'

// Tipo acciones
// sign-up
// addError
// removeError
// notAuthenticated
// logout
export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "signUp":
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                rut: action.payload.rut,
            }
        case "notAuthenticated":
            return {

            }
        case "logout":
            return {
                ...state,
                errorMessage: [],
                status: 'not-authenticated',
                token: null,
                user: null,
            }
        case "addError":
            return {
                ...state,
                errorMessage: action.payload,
                status: 'not-authenticated',
                token: null,
                user: null,
                rut: null
            }
        case "removeError":
            return {
                ...state,
                errorMessage: [],
            }
        default:
            return state;
    }
}
