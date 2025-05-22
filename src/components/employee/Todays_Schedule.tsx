//// filepath: c:\Users\Giron\Desktop\app_assist_control\src\components\employee\Todays_Schedule.tsx
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResumen } from '../../api/dashboardEmployee';
import { Clock } from 'lucide-react-native';

export default function Todays_Schedule() {
  const [horarioHoy, setHorarioHoy] = useState<{
    dia: string;
    hora_inicio: string;
    hora_fin: string;
  } | null>(null);

  // Función para mostrar solo hora y minutos (HH:MM)
  const formatHour = (hora: string) => {
    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
  };

  // Función para determinar AM o PM en base a la hora
  const getAmPm = (hora: string) => {
    const hour = parseInt(hora.split(':')[0], 10);
    return hour < 12 ? 'AM' : 'PM';
  };

  const loadSchedule = async () => {
    try {
      const authData = await AsyncStorage.getItem('authData')
      if (!authData) return
      const { token } = JSON.parse(authData)
      const data = await getResumen(token)
      setHorarioHoy(data.horario_del_dia)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadSchedule()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadSchedule()
    }, [])
  )

  if (!horarioHoy) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Cabecera con ícono y título */}
      <View style={styles.header}>
        <Clock width={24} height={24} color="#FFFFFF" />
        <Text style={styles.title}>Horario de hoy</Text>
      </View>

      {/* Información del día y horas */}
      <View style={styles.scheduleRow}>
        <Text style={styles.day}>{horarioHoy.dia}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Hora inicio</Text>
            <Text style={styles.timeValue}>
              {formatHour(horarioHoy.hora_inicio)} {getAmPm(horarioHoy.hora_inicio)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Hora fin</Text>
            <Text style={styles.timeValue}>
              {formatHour(horarioHoy.hora_fin)} {getAmPm(horarioHoy.hora_fin)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderColor: '#262626',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F5F7',
    marginLeft: 8
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  day: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeBlock: {
    alignItems: 'center'
  },
  timeLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F3F5F7'
  },
  divider: {
    width: 16,
    height: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 8
  }
});