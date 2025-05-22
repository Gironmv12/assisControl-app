import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { BadgeX, BadgeCheck } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResumen } from '../../api/dashboardEmployee';

export default function Today_Attendance() {
  const [asistenciaHoy, setAsistenciaHoy] = useState<boolean | null>(null);

  const loadAttendance = async () => {
    try {
      const authData = await AsyncStorage.getItem('authData')
      if (!authData) return
      const { token } = JSON.parse(authData)
      const data = await getResumen(token)
      setAsistenciaHoy(data.asistencia_hoy)
    } catch (e) {
      console.error(e)
    }
  }

  // Primera carga
  useEffect(() => {
    loadAttendance()
  }, [])

  // Se vuelve a invocar al hacer foco en esta pantalla
  useFocusEffect(
    useCallback(() => {
      loadAttendance()
    }, [])
  )

  if (asistenciaHoy === null) {
    return <Text>Cargando...</Text>;
  }

  const borderColor = asistenciaHoy ? '#22c55e' : '#f87171'; // verde claro y rojo claro
const Icon = asistenciaHoy ? BadgeCheck : BadgeX;

return (
  <View style={[styles.card]}>
    <Icon width={24} height={24} color={borderColor} />
    <Text style={styles.text}>
      {asistenciaHoy
        ? 'Has registrado tu asistencia correctamente hoy.'
        : 'No se ha registrado tu asistencia para el día de hoy.'}
    </Text>
  </View>
);
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    backgroundColor: '#181818', // más sobrio y consistente con fondo #101010
    borderColor: '#262626',
    borderWidth: 1,
  },
  text: {
    color: '#F3F5F7',
    fontSize: 16,
  }
});
