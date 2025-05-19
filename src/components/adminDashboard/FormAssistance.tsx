import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AdminStackParamList } from '../../navigation/AdminStack'
import { actualizarAsistencia } from '../../api/attendacenApi'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Calendar, Edit3 } from 'lucide-react-native'

import AppBar from '../../components/adminDashboard/AppBar'

// Convertir la hora en formato string (ej. "08:20:56.60574") a Date (fecha ficticia)
function parseTime(timeStr: string): Date {
  return new Date(`1970-01-01T${timeStr}`)
}

function formatTimeLocal(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

type EditAttendanceRouteProp = RouteProp<AdminStackParamList, 'EditAttendance'>

export default function FormAssistance() {
  const route = useRoute<EditAttendanceRouteProp>()
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>()
  
  const { attendance } = route.params

  const [horaEntrada, setHoraEntrada] = useState<Date>(parseTime(attendance.hora_entrada))
  const [horaSalida, setHoraSalida] = useState<Date>(parseTime(attendance.hora_salida))
  
  const [showHoraEntradaPicker, setShowHoraEntradaPicker] = useState<boolean>(false)
  const [showHoraSalidaPicker, setShowHoraSalidaPicker] = useState<boolean>(false)

  const handleUpdate = async () => {
    try {
      await actualizarAsistencia(attendance.id, {
        hora_entrada: formatTimeLocal(horaEntrada),
        hora_salida: formatTimeLocal(horaSalida),
        registro_manual: attendance.registro_manual || 'admin'
      });
      Alert.alert('Éxito', 'Asistencia actualizada');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating attendance:', error);
      Alert.alert('Error', 'No se pudo actualizar la asistencia');
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar title="Editar Asistencia" />
      <View style={styles.historyContainer}>
        <View style={styles.attendanceCard}>
          <View style={styles.cardHeader}>
            <View style={styles.dateContainer}>
              <Calendar size={20} color="#f4f5f7" />
              <Text style={styles.cardDate}>Fecha: {attendance.fecha}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Hora de Entrada</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowHoraEntradaPicker(true)}
              >
                <Text style={styles.timeValue}>{horaEntrada.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showHoraEntradaPicker && (
                <DateTimePicker
                  value={horaEntrada}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedTime) => {
                    setShowHoraEntradaPicker(Platform.OS === 'ios')
                    if (selectedTime) setHoraEntrada(selectedTime)
                  }}
                />
              )}
            </View>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Hora de Salida</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowHoraSalidaPicker(true)}
              >
                <Text style={styles.timeValue}>{horaSalida.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showHoraSalidaPicker && (
                <DateTimePicker
                  value={horaSalida}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedTime) => {
                    setShowHoraSalidaPicker(Platform.OS === 'ios')
                    if (selectedTime) setHoraSalida(selectedTime)
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
              <Edit3 size={16} color="#4D96FF" />
              <Text style={styles.editButtonText}>Actualizar Asistencia</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  historyContainer: {
    padding: 16,
    gap: 16,
  },
  attendanceCard: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#f4f5f7',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
    borderRadius: 12,
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#F3F5F7',
    marginBottom: 4,
  },
  timeValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#b0b0b0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#3d3d3d',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#3d3d3d',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4D96FF',
  }
})