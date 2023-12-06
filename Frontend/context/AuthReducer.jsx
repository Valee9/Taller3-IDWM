import { View, Text } from 'react-native'
import React from 'react'

// Tipo acciones
// sign-up
// addError
// removeError
// notAuthenticated
// logout
export const AuthReducer = (state, action) => {
    switch(action.type){
        case "sign-up":
            return {

            }
            case "notAuthenticated":
            return {
                
            }
            case "logout":
            return {
                
            }
            case "addError":
            return {
                
            }
            case "removeError":
            return {
                
            }
            default:
                return state;
    }
}
