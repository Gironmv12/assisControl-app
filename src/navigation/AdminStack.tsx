import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminTabs from './AdminTabs'
import DetailsEmployee from '../screens/Admin/DetailsEmployee'

export type AdminStackParamList = {
  AdminTabs: undefined;
  DetailsEmployee: { id: number };
};

const Stack = createNativeStackNavigator<AdminStackParamList>()

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="DetailsEmployee" component={DetailsEmployee} />
    </Stack.Navigator>
  )
}

export default AdminStack