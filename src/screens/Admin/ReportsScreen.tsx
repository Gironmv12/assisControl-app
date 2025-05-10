import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={[{ flex: 1 }]}>
          <Text>Screen de Reportes</Text>
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