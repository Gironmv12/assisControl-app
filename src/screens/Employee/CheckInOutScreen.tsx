import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'
import AttendanceRegistration from '../../components/employee/AttendanceRegistration'
import AttendanceConsultation from '../../components/employee/AttendanceConsultation'

export default function CheckInOutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderApp title='Asistencia' />
      <AttendanceRegistration />
      <AttendanceConsultation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 16,
  }
})