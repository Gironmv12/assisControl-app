import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen'
import EmployeeDashboardScreen from '../screens/Admin/EmployeeDashboardScreen'
import AttendanceManagementScreen from '../screens/Admin/AttendanceManagementScreen'
import ReportsScreen from '../screens/Admin/ReportsScreen'
import ProfileScreenAdmin from '../screens/Admin/ProfileScreenAdmin'

import CustomTabBar from './CustomTabBar'

import React from 'react'

const Tab = createBottomTabNavigator()

const AdminTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>        
       <Tab.Screen name="Inicio" component={AdminDashboardScreen} /> 
       <Tab.Screen name="Empleados" component={EmployeeDashboardScreen} />
       <Tab.Screen name="Asistencia" component={AttendanceManagementScreen} /> 
       <Tab.Screen name="Reportes" component={ReportsScreen} />
    </Tab.Navigator>
  )
}

export default AdminTabs
