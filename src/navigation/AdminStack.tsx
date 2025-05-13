import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminTabs from './AdminTabs'
import DetailsEmployee from '../screens/Admin/DetailsEmployee'
import EmpleadoFormScreen from '../screens/Admin/EmpleadoFormScreen'
import ConsultAssistance from '../components/adminDashboard/ConsultAssistance'
import FormAssistance from '../components/adminDashboard/FormAssistance'

export type AdminStackParamList = {
  AdminTabs: undefined;
  DetailsEmployee: { id: number };
  EmpleadoFormScreen: { id?: number } | undefined;
  FormAssistance: { attendance: {       // Ahora se espera el parámetro attendance
    id: number;
    usuario_id: number;
    fecha: string;
    hora_entrada: string;
    hora_salida: string;
    registro_manual?: string;
  } };
  AttendanceList: undefined;
  EditAttendance: { attendance: {       // Puedes conservarlo o eliminarlo si ya no es necesario
    id: number;
    usuario_id: number;
    fecha: string;
    hora_entrada: string;
    hora_salida: string;
    registro_manual?: string;
  } };
};

const Stack = createNativeStackNavigator<AdminStackParamList>()

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="DetailsEmployee" component={DetailsEmployee} />
      <Stack.Screen name="EmpleadoFormScreen" component={EmpleadoFormScreen} />
      <Stack.Screen name="FormAssistance" component={FormAssistance} />
      <Stack.Screen name="AttendanceList" component={ConsultAssistance} />
    </Stack.Navigator>
  )
}

export default AdminStack