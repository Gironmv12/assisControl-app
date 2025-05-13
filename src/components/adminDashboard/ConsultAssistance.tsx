import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { consultarAsistencias } from '../../api/attendacenApi'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AdminStackParamList } from '../../navigation/AdminStack'
import { Calendar, Edit3 } from 'lucide-react-native'

interface UsuarioData {
  id: number;
  persona_id: number;
  username: string;
  password_hash: string;
  rol_id: number;
  persona: {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
  }
}

interface Attendance {
  id: number;
  usuario_id: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
  registro_manual?: string;
  usuario: UsuarioData;
}

export default function ConsultAssistance() {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>()

  const loadAttendances = async () => {
    try {
      const data = await consultarAsistencias({})
      setAttendances(data)
    } catch (error) {
      console.error('Error loading attendances:', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAttendances()
    }, [])
  )

  const renderItem = ({ item }: { item: Attendance }) => {
    return (
      <View style={styles.attendanceCard}>
        <View style={styles.cardHeader}>
          <View style={styles.dateContainer}>
            <Calendar size={20} color="#1F2937" />
            <Text style={styles.cardDate}>Fecha: {item.fecha}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Entrada:</Text>
            <Text style={styles.timeValue}>{item.hora_entrada}</Text>
          </View>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Salida:</Text>
            <Text style={styles.timeValue}>{item.hora_salida}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.recordType}>
            Usuario: {item.usuario.persona.nombre} {item.usuario.persona.apellido_paterno} {item.usuario.persona.apellido_materno}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('FormAssistance', { attendance: item })}
          >
            <Edit3 size={16} color="#4D96FF" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencias</Text>
      <FlatList
        data={attendances}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.historyContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16
  },
  historyContainer: {
    gap: 16
  },
  attendanceCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cardDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937'
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  timeValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  recordType: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
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