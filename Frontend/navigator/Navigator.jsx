import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../components/Index';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Password from '../components/Password';
import { AuthContext } from '../context/AuthContext';
// Crea un Stack Navigator usando @react-navigation/native-stack
const Stack = createNativeStackNavigator();
// Componente Navigator que gestiona la navegación de la aplicación
export const Navigator = () => {
  // Obtiene el estado de autenticación del contexto
  const { status } = useContext(AuthContext);
  console.log(status)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {status !== 'authenticated' ? (
         // Pantallas para usuarios no autenticados
        <>
            <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </>
      ) : (
         // Pantallas para usuarios autenticados
        <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};