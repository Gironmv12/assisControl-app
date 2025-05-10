import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EmployeeDashboardScreen from '../screens/Admin/EmployeeDashboardScreen'
import CheckInOutScreen from '../screens/Employee/CheckInOutScreen'
import ScheduleScreen from '../screens/Employee/ScheduleScreen'
import ProfileScreen from '../screens/Employee/ProfileScreen'

import CustomTabBarEmployee from './CustomTabBarEmployee'


const Tab = createBottomTabNavigator()

const EmployeeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBarEmployee {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={EmployeeDashboardScreen} />
      <Tab.Screen name="Asistencia" component={CheckInOutScreen} />
      <Tab.Screen name="Horario" component={ScheduleScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default EmployeeTabs
