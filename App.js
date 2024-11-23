import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import DrawerTab from './src/screens/common/drawer/DrawerTab';
import BottomTab from './src/screens/common/bottomNav/BottomTab';
import AddExpenses from './src/screens/AddExpenses/AddExpenses';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();


function App() {

  const [login, setLogin] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('acpt-student');
        if (token) {
          setLogin(true);
        }
      } catch (error) {
        console.error('Error reading token from AsyncStorage', error);
      }
    };

    checkLoginStatus();
  }, []);


  return (

    <NavigationContainer>

      <Stack.Navigator>

        {!login && (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}

        <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

export default App;
