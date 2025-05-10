import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EmployeeTabs from './EmployeeTabs'

const Stack = createNativeStackNavigator()

const EmployeeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EmployeeTabs" component={EmployeeTabs} />
    </Stack.Navigator>
  )
}

export default EmployeeStack
