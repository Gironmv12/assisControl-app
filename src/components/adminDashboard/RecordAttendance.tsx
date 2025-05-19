import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { registrarAsistencia, AsistenciaPayload, obtenerUsuarios, Usuario } from '../../api/attendacenApi'
import ConsultAssistance from './ConsultAssistance'

export default function RecordAttendance() {
  // Estado para tab activa: 'register' o 'consult'
  const [activeTab, setActiveTab] = useState<'register' | 'consult'>('register')

  // Lista de usuarios obtenidos de la API
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  // Selección del usuario (usando persona_id)
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | null>(null)

  // Usamos objetos Date para fecha y horas
  const [fecha, setFecha] = useState<Date>(new Date())
  const [horaEntrada, setHoraEntrada] = useState<Date>(new Date())
  const [horaSalida, setHoraSalida] = useState<Date>(new Date())

  // Estados para mostrar u ocultar los DateTimePicker
  const [showFechaPicker, setShowFechaPicker] = useState<boolean>(false)
  const [showHoraEntradaPicker, setShowHoraEntradaPicker] = useState<boolean>(false)
  const [showHoraSalidaPicker, setShowHoraSalidaPicker] = useState<boolean>(false)

  // Estado para elegir quién registra manualmente
  const [registroManual, setRegistroManual] = useState<string>('admin')

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await obtenerUsuarios()
        setUsuarios(data)
        // Selecciona el primer usuario por defecto (usando persona_id)
        if (data.length > 0) {
          setSelectedUsuarioId(data[0].persona.id)
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
      }
    }
    fetchUsuarios()
  }, [])

  const handleRegistrar = async () => {
    if (!selectedUsuarioId) {
      Alert.alert('Error', 'Por favor, selecciona un usuario.')
      return
    }
    const payload: AsistenciaPayload = {
      usuario_id: selectedUsuarioId,
      fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
      hora_entrada: horaEntrada.toISOString(),  // Formato ISO
      hora_salida: horaSalida.toISOString(),    // Formato ISO
      registro_manual: registroManual
    }
    try {
      const response = await registrarAsistencia(payload)
      Alert.alert('Éxito', 'Asistencia registrada correctamente.')
      console.log('Respuesta:', response)
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la asistencia.')
    }
  }

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'register' && styles.activeTab]}
          onPress={() => setActiveTab('register')}
        >
          <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>Registrar Asistencia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'consult' && styles.activeTab]}
          onPress={() => setActiveTab('consult')}
        >
          <Text style={[styles.tabText, activeTab === 'consult' && styles.activeTabText]}>Consultar Asistencias</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'register' ? (
        // Contenido del formulario para registrar asistencia.
        <View>
          {/* Grupo para seleccionar usuario */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Usuario</Text>
            <Picker
              selectedValue={selectedUsuarioId}
              onValueChange={(itemValue) => setSelectedUsuarioId(itemValue)}
              style={styles.input}
              dropdownIconColor={'#ffffff'}
            >
              {usuarios.map((user) => (
                <Picker.Item
                  key={user.id}
                  label={`${user.persona.nombre} ${user.persona.apellido_paterno}`}
                  value={user.persona.id}
                  color='#ffffff'
                  style={{ backgroundColor: '#262626' }}
                />
              ))}
            </Picker>
          </View>

          {/* Grupo para seleccionar Fecha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha</Text>
            <TouchableOpacity onPress={() => setShowFechaPicker(true)} style={styles.datePickerButton}>
              <Text style={styles.dateText}>{fecha.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showFechaPicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowFechaPicker(Platform.OS === 'ios')
                  if (selectedDate) setFecha(selectedDate)
                }}
              />
            )}
          </View>

          {/* Grupo para Hora de Entrada */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hora de Entrada</Text>
            <TouchableOpacity onPress={() => setShowHoraEntradaPicker(true)} style={styles.datePickerButton}>
              <Text style={styles.dateText}>{horaEntrada.toLocaleTimeString()}</Text>
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

          {/* Grupo para Hora de Salida */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hora de Salida</Text>
            <TouchableOpacity onPress={() => setShowHoraSalidaPicker(true)} style={styles.datePickerButton}>
              <Text style={styles.dateText}>{horaSalida.toLocaleTimeString()}</Text>
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

          {/* Grupo para Registro Manual */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registro Manual</Text>
            <Picker
              selectedValue={registroManual}
              onValueChange={(itemValue) => setRegistroManual(itemValue)}
              style={styles.input}
              dropdownIconColor={'#ffffff'}
            >
              <Picker.Item label="Admin" value="admin"  color='#ffffff'
                  style={{ backgroundColor: '#262626' }}/>
              <Picker.Item label="Usuario" value="usuario" color='#ffffff'
                  style={{ backgroundColor: '#262626' }}/>
            </Picker>
          </View>

          <TouchableOpacity style={styles.recordButton} onPress={handleRegistrar}>
            <Text style={styles.recordButtonText}>Registrar Asistencia</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Renderiza el componente ConsultAssistance para consultar las asistencias.
        <ConsultAssistance />
      )}

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  // Nuevo diseño para el Tab
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#181818',
    marginBottom: 16,
    borderRadius: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#1e1e1e',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#b0b0b0',
  },
  activeTabText: {
    color: '#F3F5F7',
  },
  // ...el resto de estilos sin cambios...
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F3F5F7',
    marginBottom: 8,
  },
  input: {
    padding: 8,
    borderRadius: 12,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    gap: 8,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#F3F5F7',
  },
  recordButton: {
    backgroundColor: '#0064e0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  recordButtonText: {
    fontFamily: 'Inter-Medium',
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF',
  }
})