import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminTabs from './AdminTabs'
import DetailsEmployee from '../screens/Admin/DetailsEmployee'
import EmpleadoFormScreen from '../screens/Admin/EmpleadoFormScreen'

export type AdminStackParamList = {
  AdminTabs: undefined;
  DetailsEmployee: { id: number };
  EmpleadoFormScreen: { id?: number } | undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>()

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="DetailsEmployee" component={DetailsEmployee} />
      <Stack.Screen name="EmpleadoFormScreen" component={EmpleadoFormScreen} />
    </Stack.Navigator>
  )
}

export default AdminStack