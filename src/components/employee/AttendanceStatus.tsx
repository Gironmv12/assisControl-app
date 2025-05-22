import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResumen } from '../../api/dashboardEmployee';
import { Calendar, Clock } from 'lucide-react-native';

export default function AttendanceStatus() {
  const [attendanceStatus, setAttendanceStatus] = useState<{
    asistencias_del_mes: number;
    ultima_asistencia: {
      fecha: string;
      hora_entrada: string;
      hora_salida: string;
    } | null;
  } | null>(null);

  // Función para mostrar solo hora y minutos en formato (HH:MM)
  const formatHour = (hora: string) => {
    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
  };

  // Función para determinar AM o PM en base a la hora
  const getAmPm = (hora: string) => {
    const hour = parseInt(hora.split(':')[0], 10);
    return hour < 12 ? 'AM' : 'PM';
  };

  const loadStatus = async () => {
    try {
      const authData = await AsyncStorage.getItem('authData')
      if (!authData) return
      const { token } = JSON.parse(authData)
      const data = await getResumen(token)
      setAttendanceStatus({
        asistencias_del_mes: data.asistencias_del_mes,
        ultima_asistencia: data.ultima_asistencia
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadStatus()
    }, [])
  )

  if (!attendanceStatus) {
    return <Text>Cargando...</Text>;
  }

  if (attendanceStatus.ultima_asistencia === null) {
    return (
      <View style={styles.statCardContent}>
        <Text style={styles.statTitle}>Aún no registras ninguna asistencia</Text>
      </View>
    );
  }

  const { asistencias_del_mes, ultima_asistencia } = attendanceStatus;
  const hasHoraSalida =
    ultima_asistencia.hora_salida &&
    ultima_asistencia.hora_salida !== '00:00' &&
    ultima_asistencia.hora_salida !== '00:00:00';

  return (
    <View>
      {/* Encabezado */}
      <View style={styles.statCard}>
        <View style={styles.iconContainer}>
          <Calendar width={24} height={24} color="#FFFFFF" />
        </View>
        <View style={styles.statContent}>
          <Text style={styles.statTitle}>Asistencias del mes</Text>
          <Text style={styles.statValue}>{asistencias_del_mes} Días</Text>
        </View>
      </View>

      {/* Última asistencia */}
      <View style={styles.statCardContent}>
        <View style={styles.statCardHeader}>
          <View style={styles.iconContainer}>
            <Clock width={24} height={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.statTitle}>Última asistencia</Text>
          </View>
        </View>
        <View style={styles.scheduleRow}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Fecha</Text>
            <Text style={styles.timeValue}>{ultima_asistencia.fecha}</Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Hora entrada</Text>
              <Text style={styles.timeValue}>
                {formatHour(ultima_asistencia.hora_entrada)}{' '}
                {getAmPm(ultima_asistencia.hora_entrada)}
              </Text>
            </View>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Hora salida</Text>
              <Text style={styles.timeValue}>
                {hasHoraSalida
                  ? `${formatHour(ultima_asistencia.hora_salida)} ${getAmPm(ultima_asistencia.hora_salida)}`
                  : 'No se ha registrado'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#181818',
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: '#262626',
    borderWidth: 1,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardContent: {
    flexDirection: 'column',
    paddingVertical: 8,
    backgroundColor: '#181818',
    marginTop: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderColor: '#262626',
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: '#f3f4f6',
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  timeBlock: {
    paddingHorizontal: 16,
  },
  timeLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F3F5F7',
  },
});