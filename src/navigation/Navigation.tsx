//// filepath: c:\Users\Giron\Desktop\app_assist_control\src\navigation\Navigation.tsx
// ...existing code...
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/Auth/SplashScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
// ...remove direct imports of AdminDashboardScreen, EmployeeDashboardScreen...
import AdminStack from './AdminStack'
import EmployeeStack from './EmployeeStack'

import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* ...existing code... */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Replaced problematic routes with stack navigators */}
        <Stack.Screen name="EmployeeStack" component={EmployeeStack} />
        <Stack.Screen name="AdminStack" component={AdminStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}