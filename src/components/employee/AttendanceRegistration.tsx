import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { recordAttendance, fetchAttendances } from '../../api/employee_assistance'
import { Clock } from 'lucide-react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function AttendanceRegistration() {
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('Registrar Entrada')
  const isFocused = useIsFocused()

  // Constantes de horario
  const SHIFT_START = { hour: 9, minute: 0 }
  const SHIFT_END = { hour: 18, minute: 0 }
  const TOLERANCE_MINUTES = 15

  const scale = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  useEffect(() => {
    ;(async () => { await checkTime() })()
  }, [hasCheckedIn, isFocused])

  useFocusEffect(
    useCallback(() => {
      checkTime()
    }, [hasCheckedIn])
  )

  async function checkTime() {
    setButtonEnabled(false)
    try {
      const tokenData = await AsyncStorage.getItem('authData')
      if (!tokenData) return
      const { token } = JSON.parse(tokenData)

      const attendances = await fetchAttendances(token)
      const today = new Date().toISOString().split('T')[0]   // "YYYY-MM-DD"
      const todayRecord = attendances.find(r => r.fecha === today)

      const now = new Date()
      const start = new Date()
      start.setHours(SHIFT_START.hour, SHIFT_START.minute, 0, 0)
      const startTolerance = new Date(start.getTime() + TOLERANCE_MINUTES * 60000)
      const end = new Date()
      end.setHours(SHIFT_END.hour, SHIFT_END.minute, 0, 0)

      if (!todayRecord) {
        // Ventana de entrada
        setHasCheckedIn(false)
        setButtonLabel('Registrar Entrada')
        if (now >= start && now <= startTolerance) {
          setButtonEnabled(true)
        }
      } else if (todayRecord.hora_salida === null) {
        // Ventana de salida
        setHasCheckedIn(true)
        setButtonLabel('Registrar Salida')
        if (now >= end) {
          setButtonEnabled(true)
        }
      } else {
        // Ya hizo entrada y salida
        setHasCheckedIn(true)
        setButtonLabel('Asistencia completada')
      }
    } catch (error) {
      console.error(error)
    }
  }

async function handleAttendance() {
  try {
    const tokenData = await AsyncStorage.getItem('authData')
    if (!tokenData) return Alert.alert('Error', 'No se encontró token')
    const { token } = JSON.parse(tokenData)

    // recibe el objeto con hora_entrada o hora_salida
    const attendance = await recordAttendance(token)

    // extrae la propiedad correcta y la convierte a local
    const isoTime = !hasCheckedIn
      ? attendance.hora_entrada
      : attendance.hora_salida
    const localTime = dayjs.utc(isoTime).local().format('HH:mm')

    Alert.alert(
      'Asistencia',
      `${!hasCheckedIn ? 'Entrada registrada' : 'Salida registrada'}: ${localTime}`
    )
    setHasCheckedIn(!hasCheckedIn)
  } catch {
    Alert.alert('Error', 'No se pudo registrar asistencia')
  }
}

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Registro de Asistencia</Text>
      <View style={styles.content}>
        <Text style={styles.instruction}>
          Presiona el botón para registrar tu entrada o salida
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleAttendance}
            disabled={!buttonEnabled}
            style={[styles.button, !buttonEnabled && styles.buttonDisabled]}
            onPressIn={() => { scale.value = withSpring(0.9) }}
            onPressOut={() => { scale.value = withSpring(1) }}
          >
            <Clock color="#101010" size={20} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: '#262626',
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F3F5F7',
    marginBottom: 16,
    textAlign: 'center'
  },
  content: {
    alignItems: 'center'
  },
  instruction: {
    fontSize: 16,
    color: '#636366',
    textAlign: 'center',
    marginBottom: 24
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonIcon: {
    marginRight: 8
  },
  buttonText: {
    color: '#101010',
    fontSize: 18,
    fontWeight: '600'
  }
})