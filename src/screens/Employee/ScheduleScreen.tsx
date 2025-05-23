import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'
import Schedules from '../../components/employee/Schedules'

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderApp title='Horario' />
      <Schedules />
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