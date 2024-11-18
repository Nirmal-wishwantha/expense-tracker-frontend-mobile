import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import DrawerTab from './src/screens/common/drawer/DrawerTab';
import BottomTab from './src/screens/common/bottomNav/BottomTab';


const Stack = createNativeStackNavigator();


function App() {

const [login,setLogin]=useState(false);



  return (

    <NavigationContainer>
      
      <Stack.Navigator>
                {!login && (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                )}

                <Stack.Screen name="Drawer" component={DrawerTab} options={{ headerShown: false }} />

                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>

    </NavigationContainer>

  );
}

export default App;
