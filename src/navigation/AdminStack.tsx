// src/navigation/AdminStack.tsx

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminTabs from './AdminTabs'

const Stack = createNativeStackNavigator()

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
    </Stack.Navigator>
  )
}

export default AdminStack
