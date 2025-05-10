import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

import AssisDay from '../../components/adminDashboard/AssisDay'
import AssisWeek from '../../components/adminDashboard/AssisWeek'
import AssisRegistered from '../../components/adminDashboard/AssisRegistered'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

export default function AdminDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    )
  }

  const formattedDate = dayjs().locale('es').format('dddd, D [de] MMMM [de] YYYY')

  // Animación de entrada con reanimated usando withSpring
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  });

  useEffect(() => {
    opacity.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    })
  }, [opacity])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <View style={styles.container}>
          <View>
            <Text style={styles.greeting}>Bienvenido de nuevo</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <View>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
        <AssisDay />
        <AssisWeek />
        <AssisRegistered />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'right',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
})