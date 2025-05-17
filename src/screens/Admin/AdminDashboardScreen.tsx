import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'
import AssisDay from '../../components/adminDashboard/AssisDay'
import AssisWeek from '../../components/adminDashboard/AssisWeek'
import AssisRegistered from '../../components/adminDashboard/AssisRegistered'

export default function AdminDashboardScreen() {
  const formattedDate = dayjs().locale('es').format('dddd, D [de] MMMM [de] YYYY')

  const opacity = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  })

  useFocusEffect(
    React.useCallback(() => {
      opacity.value = withSpring(1, {
        damping: 20,
        stiffness: 90,
      })
      return () => {
        opacity.value = 0
      }
    }, [opacity])
  )

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Animated.ScrollView
        style={[{ flex: 1 }, animatedStyle]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]} // El primer elemento (HeaderApp) se mantendrá fijo
      >
        <HeaderApp title="Dashboard" />
        <View style={styles.container}>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <AssisDay />
        <AssisWeek />
        <AssisRegistered />
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
})