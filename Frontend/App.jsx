import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './navigator/Navigator'
import { AuthProvider } from './context/AuthContext';

const AppState = ({children}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;