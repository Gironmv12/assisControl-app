import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'
import RecordAttendance from '../../components/adminDashboard/RecordAttendance'

export default function AttendanceManagementScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={[{ flex: 1 }]}>
          <HeaderApp title="Gestión de Asistencia" />
          <RecordAttendance />
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  }
})