import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import AsyncStorage from '@react-native-async-storage/async-storage'

import HeaderApp from '../../components/adminDashboard/HeaderNavbar'
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
  const [user, setUser] = useState<{ nombre: string; apellido_paterno: string }>({
    nombre: '',
    apellido_paterno: ''
  })

  useEffect(() => {
    async function fetchAuthData() {
      const authDataString = await AsyncStorage.getItem('authData')
      if (authDataString) {
        const authData = JSON.parse(authDataString)
        setUser({
          nombre: authData.persona.nombre,
          apellido_paterno: authData.persona.apellido_paterno,
        })
      }
    }
    fetchAuthData()
  }, [])

  const handleLogout = () => {
    // Aquí también podrías limpiar el AsyncStorage si lo requieres
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    )
  }

  const formattedDate = dayjs().locale('es').format('dddd, D [de] MMMM [de] YYYY')

  // Animación de entrada con reanimated usando withSpring
  const opacity = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value }
  })

  useEffect(() => {
    opacity.value = withSpring(1, {
      damping: 20,
      stiffness: 90,
    })
  }, [opacity])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <HeaderApp
          persona={{
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
          }}
          onLogout={handleLogout}
        />
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <View>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
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
    backgroundColor: '#ffffff',
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
    paddingVertical: 5,
  },
})