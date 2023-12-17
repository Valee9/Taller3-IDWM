export const AuthReducer = (state, action) => {
    switch (action.type) {
        // Acción para un registro exitoso
        case "signUp":
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                rut: action.payload.rut,
            }
        // Acción para cuando el usuario no está autenticado
        case "notAuthenticated":
            return {

            }
        // Acción para cerrar sesión
        case "logout":
            return {
                ...state,
                errorMessage: [],
                status: 'not-authenticated',
                token: null,
                user: null,
            }
        // Acción para agregar un mensaje de error
        case "addError":
            return {
                ...state,
                errorMessage: action.payload,
                status: 'not-authenticated',
                token: null,
                user: null,
                rut: null
            }
        // Acción para eliminar el mensaje de error
        case "removeError":
            return {
                ...state,
                errorMessage: [],
            }
        // Por defecto, retorna el estado actual sin cambios
        default:
            return state;
    }
}
