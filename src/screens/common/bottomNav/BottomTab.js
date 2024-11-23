import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddExpenses from '../../AddExpenses/AddExpenses';
import Settings from '../../settings/Settings';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddExpenses') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size || 30} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 50,
          paddingBottom:10,
          backgroundColor: '#f8f9fa',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddExpenses"
        component={AddExpenses}
        options={{
          tabBarLabel: 'Add Expenses',
          // headerShown: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          // headerShown: false,
        }}
      />

    </Tab.Navigator>
  );
}
