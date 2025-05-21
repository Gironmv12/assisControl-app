import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'


export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderApp title='Perfil' />
      <Text>ProfileScreen</Text>
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