import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fecthEmployeeById, Empleado, deleteEmployee } from '../../api/employeeApi'
import { Mail, Phone, Building2, Briefcase, Calendar, Clock, Pencil, Trash2 } from 'lucide-react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AdminStackParamList } from '../../navigation/AdminStack'
import AppBar from '../../components/adminDashboard/AppBar'

interface RouteParams {
  id: number;
}

export default function DetailsEmployee() {
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>()
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [employee, setEmployee] = useState<Empleado | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadEmployee = async () => {
    try {
      const data = await fecthEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadEmployee();
    }, [id])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.center}>
        <Text>No se encontraron datos del empleado.</Text>
      </View>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      navigation.navigate('AdminTabs');
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const fullName = `${employee.usuario.persona.nombre} ${employee.usuario.persona.apellido_paterno} ${employee.usuario.persona.apellido_materno}`;
  const curp = (employee.usuario.persona as any).curp || 'N/A';
  const email = (employee.usuario.persona as any).correo || 'N/A';
  const phone = (employee.usuario.persona as any).telefono || 'N/A';
  const schedule = employee.horarios_laborales.map(horario => ({
    day: horario.dia_semana,
    hours: `${horario.hora_inicio} - ${horario.hora_fin}`
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppBar title="Detalles del empleado" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {employee.usuario.persona.nombre.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.curp}>CURP: {curp}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informacion de contacto</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Mail size={20} color="#FFFFFF" />
              <Text style={styles.infoText}>{email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.infoText}>{phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informacion de trabajo</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Building2 size={20} color="#FFFFFF" />
              <Text style={styles.infoText}>{employee.departamento}</Text>
            </View>
            <View style={styles.infoRow}>
              <Briefcase size={20} color="#FFFFFF" />
              <Text style={styles.infoText}>{employee.puesto}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horarios laborales</Text>
          <View style={styles.scheduleContainer}>
            {schedule.map((s, index) => (
              <View key={index} style={styles.scheduleRow}>
                <View style={styles.scheduleDay}>
                  <Calendar size={20} color="#FFFFFF" />
                  <Text style={styles.scheduleDayText}>{s.day}</Text>
                </View>
                <View style={styles.scheduleHours}>
                  <Clock size={20} color="#FFFFFF" />
                  <Text style={styles.scheduleHoursText}>{s.hours}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate("EmpleadoFormScreen", { id: employee.id })}
          >
            <Pencil size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Trash2 size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4D96FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#F3F5F7',
    marginBottom: 8,
    textAlign: 'center',
  },
  curp: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#f4f5f8',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#F3F5F7',
    marginBottom: 16,
  },
  infoContainer: {
    rowGap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#787878',
  },
  scheduleContainer: {
    rowGap: 16,
  },
  scheduleRow: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  scheduleDay: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 8,
  },
  scheduleDayText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F3F5F7',
  },
  scheduleHours: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  scheduleHoursText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#787878',
  },
  actionButtons: {
    flexDirection: 'row',
    columnGap: 12,
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    padding: 12,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#4D96FF',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});