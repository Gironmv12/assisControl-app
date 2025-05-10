import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

export default function EmployeeDashboardScreen() {
  return (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <View style={[{ flex: 1 }]}>
      <Text>Hola</Text>
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