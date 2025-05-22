import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchAttendances, AttendanceRecord } from '../../api/employee_assistance'
import { Clock } from 'lucide-react-native'

export default function AttendanceConsultation() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => { loadAttendances() }, [])

  async function loadAttendances() {
    try {
      const tokenData = await AsyncStorage.getItem('authData')
      if (!tokenData) throw new Error('No se encontró token')
      const { token } = JSON.parse(tokenData)
      const data = await fetchAttendances(token)
      setRecords(data)
    } catch (e: any) {
      console.error(e)
      setError(e.message || 'Error al cargar asistencias')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Clock width={20} height={20} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Historial de asistencia</Text>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={records}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={records.length === 0 && styles.center}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay registros</Text>}
          renderItem={({ item }) => {
            const entrada = item.hora_entrada.slice(0, 5)
            const salida = item.hora_salida
              ? item.hora_salida.slice(0, 5)
              : '-'
            return (
              <View style={styles.row}>
                <Text style={styles.date}>{item.fecha}</Text>
                <View style={styles.times}>
                  <Text style={styles.time}>Entrada: {entrada}</Text>
                  <Text style={styles.time}>Salida: {salida}</Text>
                </View>
              </View>
            )
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 16,
    borderColor: '#262626',
    borderWidth: 1,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F5F7',
    marginLeft: 8
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#F3F5F7'
  },
  row: {
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  date: {
    color: '#F3F5F7',
    fontWeight: '500',
    marginBottom: 4
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  time: {
    color: '#8E8E93'
  },
  errorText: {
    color: 'red'
  }
})