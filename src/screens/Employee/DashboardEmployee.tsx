import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'
import Today_Attendance from '../../components/employee/Today_Attendance'
import Todays_Schedule from '../../components/employee/Todays_Schedule'
import AttendanceStatus from '../../components/employee/AttendanceStatus'
import Announcements from '../../components/employee/Announcements'

const DashboardEmployee = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderApp title='Dashboard' />
      <Announcements />
      <Today_Attendance />
      <Todays_Schedule />
      <AttendanceStatus />
    </SafeAreaView>
  )
}

export default DashboardEmployee

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 16,
  }
})