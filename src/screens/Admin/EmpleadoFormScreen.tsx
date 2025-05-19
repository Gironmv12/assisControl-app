import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { 
  CreateEmployeePayload, 
  fecthEmployeeById, 
  createEmployee, 
  updateEmployee 
} from '../../api/employeeApi'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AdminStackParamList } from '../../navigation/AdminStack'
import AppBar from '../../components/adminDashboard/AppBar'

type EmpleadoFormRouteParams = {
  id?: number;
}

export type Horario = {
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
}

export default function EmpleadoFormScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>()
  const route = useRoute();
  const { id } = (route.params || {}) as EmpleadoFormRouteParams;
  const isEditMode = !!id;
  
  const [initialData, setInitialData] = useState<CreateEmployeePayload | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      fecthEmployeeById(id)
        .then((employee) => {
            const data: CreateEmployeePayload = {
            nombre: employee.usuario.persona.nombre,
            apellido_paterno: employee.usuario.persona.apellido_paterno,
            apellido_materno: employee.usuario.persona.apellido_materno,
            curp: employee.usuario.persona.curp || "", // Asegúrate que la API retorne este dato
            correo: employee.usuario.persona.correo || "", // Igual para correo
            telefono: employee.usuario.persona.telefono || "", // y teléfono
            username: employee.usuario.username || "",  // si está disponible
            password: "", // Se deja vacío por seguridad
            puesto: employee.puesto,
            departamento: employee.departamento,
            horarios: employee.horarios_laborales.map(h => ({
                dia_semana: h.dia_semana,
                hora_inicio: h.hora_inicio,
                hora_fin: h.hora_fin,
            })),
            };
            setInitialData(data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [apellidoPaterno, setApellidoPaterno] = useState(initialData?.apellido_paterno || '');
  const [apellidoMaterno, setApellidoMaterno] = useState(initialData?.apellido_materno || '');
  const [curp, setCurp] = useState(initialData?.curp || '');
  const [correo, setCorreo] = useState(initialData?.correo || '');
  const [telefono, setTelefono] = useState(initialData?.telefono || '');
  const [username, setUsername] = useState(initialData?.username || '');
  const [password, setPassword] = useState('');
  const [puesto, setPuesto] = useState(initialData?.puesto || '');
  const [departamento, setDepartamento] = useState(initialData?.departamento || '');
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setApellidoPaterno(initialData.apellido_paterno);
      setApellidoMaterno(initialData.apellido_materno);
      setCurp(initialData.curp);
      setCorreo(initialData.correo);
      setTelefono(initialData.telefono);
      setUsername(initialData.username);
      setPuesto(initialData.puesto);
      setDepartamento(initialData.departamento);
      setHorarios(initialData.horarios);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const payload: Partial<CreateEmployeePayload> & { rol?: string } = {};

    if (nombre.trim()) payload.nombre = nombre;
    if (apellidoPaterno.trim()) payload.apellido_paterno = apellidoPaterno;
    if (apellidoMaterno.trim()) payload.apellido_materno = apellidoMaterno;
    if (curp.trim()) payload.curp = curp;
    if (correo.trim()) payload.correo = correo;
    if (telefono.trim()) payload.telefono = telefono;
    if (username.trim()) payload.username = username;
    // La contraseña se envía solo si se llena
    if (password.trim()) payload.password = password;
    if (puesto.trim()) payload.puesto = puesto;
    if (departamento.trim()) payload.departamento = departamento;
    if (horarios.length > 0) payload.horarios = horarios;
    if (isEditMode && rol.trim()) payload.rol = rol;

    if (isEditMode && id) {
        updateEmployee(id, payload as CreateEmployeePayload)
          .then(() => navigation.goBack())
          .catch((err) => console.error("Error updating employee:", err));
    } else {
        // En creación, se esperan todos los campos obligatorios
        createEmployee(payload as CreateEmployeePayload)
          .then(() => navigation.goBack())
          .catch((err) => console.error("Error creating employee:", err));
    }
};

  // Componente para seleccionar dinámicamente el día y las horas
  const HorarioPicker = ({ horario, index, updateHorario }: { 
    horario: Horario, 
    index: number, 
    updateHorario: (index: number, newHorario: Horario) => void 
  }) => {
    const [showInicio, setShowInicio] = useState(false);
    const [showFin, setShowFin] = useState(false);

    // Función para formatear la fecha en HH:MM
    const formatTime = (date: Date) => {
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      return `${hour}:${minute}`;
    };

    // Convertir el string a Date, usando 00:00 en caso de estar vacío
    const parseTime = (timeStr: string) => {
      if (!timeStr) return new Date();
      const [hour, minute] = timeStr.split(':').map(Number);
      const d = new Date();
      d.setHours(hour, minute, 0, 0);
      return d;
    };

    const [timeInicio, setTimeInicio] = useState<Date>( parseTime(horario.hora_inicio) );
    const [timeFin, setTimeFin] = useState<Date>( parseTime(horario.hora_fin) );

    return (
      <View style={styles.horarioContainer}>
        <Picker
          selectedValue={horario.dia_semana}
          onValueChange={(itemValue) => updateHorario(index, { ...horario, dia_semana: itemValue })}
          style={styles.picker}
          dropdownIconColor="#ffffff"
          
          //cambiar color de texto
        >
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(day => (
            <Picker.Item key={day} label={day} value={day} color='#ffffff' style={{ backgroundColor: '#262626' }}/>
          ))}
        </Picker>
        <View style={styles.timeContainer}>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowInicio(true)}
          >
            <Text style={styles.timeButtonText}>Inicio: {formatTime(timeInicio)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowFin(true)}
          >
            <Text style={styles.timeButtonText}>Fin: {formatTime(timeFin)}</Text>
          </TouchableOpacity>
        </View>
        {showInicio && (
          <DateTimePicker
            value={timeInicio}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowInicio(false);
              if (date) {
                setTimeInicio(date);
                updateHorario(index, { ...horario, hora_inicio: formatTime(date) });
              }
            }}
          />
        )}
        {showFin && (
          <DateTimePicker
            value={timeFin}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowFin(false);
              if (date) {
                setTimeFin(date);
                updateHorario(index, { ...horario, hora_fin: formatTime(date) });
              }
            }}
          />
        )}
      </View>
    );
  };

  const renderHorarioInputs = () => {
    return horarios.map((horario, index) => (
      <HorarioPicker 
        key={index} 
        horario={horario} 
        index={index} 
        updateHorario={(i, newHorario) => {
          const newHorarios = [...horarios];
          newHorarios[i] = newHorario;
          setHorarios(newHorarios);
        }}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={{ flex: 1 }}>
        <AppBar title={isEditMode ? "Editar Empleado" : "Crear Empleado"} />
        {loading ? (
          <View style={styles.center}> 
            <Text>Cargando...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Apellido Paterno" value={apellidoPaterno} onChangeText={setApellidoPaterno} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Apellido Materno" value={apellidoMaterno} onChangeText={setApellidoMaterno} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="CURP" value={curp} onChangeText={setCurp} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Puesto" value={puesto} onChangeText={setPuesto} style={styles.input} placeholderTextColor="#b0b0b0" />
            <TextInput placeholder="Departamento" value={departamento} onChangeText={setDepartamento} style={styles.input} placeholderTextColor="#b0b0b0" />

            {/* Sección de Horarios */}
            <Text style={styles.sectionTitle}>Horarios laborales</Text>
            {renderHorarioInputs()}
            <TouchableOpacity 
              style={styles.addHorarioButton}
              onPress={() => setHorarios([...horarios, { dia_semana: 'Lunes', hora_inicio: '', hora_fin: '' }])}
            >
              <Text style={styles.addHorarioButtonText}>+ Agregar Horario</Text>
            </TouchableOpacity>

            {isEditMode && (
              <TextInput placeholder="Rol" value={rol} onChangeText={setRol} style={styles.input} placeholderTextColor="#b0b0b0" />
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>{isEditMode ? "Actualizar Empleado" : "Crear Empleado"}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 16,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    padding: 8,
    height: 40,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    color: '#F3F5F7',

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F3F5F7',
  },
  addHorarioButton: {
    backgroundColor: '#0064e0',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  addHorarioButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#0064e0',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horarioContainer: {
    marginBottom: 16,
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#1f1f1f',
  },
  picker: {
    height: 50,
    marginBottom: 8,
    backgroundColor: '#1e1e1e',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeButton: {
    backgroundColor: '#0064e0',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  timeButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});