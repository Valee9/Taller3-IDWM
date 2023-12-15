import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../components/Index';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Home from '../components/Home';
import Profile from '../components/Profile';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const { status } = useContext(AuthContext);
  console.log(status)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {status !== 'authenticated' ? (
        <>
            <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </>
      ) : (
        <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};