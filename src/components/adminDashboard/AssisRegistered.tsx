import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { fetchAssistDay } from '../../api/dashboardAdmin';
import { Clock } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

dayjs.extend(customParseFormat);

interface Assist {
  id: number;
  usuario_id: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string | null;
  registro_manual: string;
  usuario: {
    id: number;
    persona_id: number;
    username: string;
    password_hash: string;
    rol_id: number;
  };
}

// Función que intenta parsear la hora usando distintos formatos
const parseTime = (timeStr: string) => {
  // Definimos los formatos posibles para las horas
  const formats = ['HH:mm:ss.SSSSS', 'HH:mm:ss.SSSSSS', 'HH:mm:ss.SSS', 'HH:mm:ss'];
  for (const fmt of formats) {
    const parsed = dayjs(timeStr, fmt, true);
    if (parsed.isValid()) {
      return parsed;
    }
  }
  // Si ninguno funciona, se hace un parseo no estricto
  return dayjs(timeStr);
};

export default function AssisRegistered() {
  const [assists, setAssists] = useState<Assist[]>([]);

  // Función para obtener y ordenar las asistencias
  const getData = async () => {
    try {
      const data: Assist[] = await fetchAssistDay();
      const sorted = data.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      setAssists(sorted.slice(0, 5));
    } catch (error) {
      console.error('Error al obtener las asistencias:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const renderItem = ({ item }: { item: Assist }) => {
    // Se formatea la fecha
    const fecha = dayjs(item.fecha).format('DD/MM/YYYY') + ' | ';
    // Se parsean las horas usando la función parseTime
    const horaEntradaParsed = parseTime(item.hora_entrada);
    const horaSalidaParsed = item.hora_salida ? parseTime(item.hora_salida) : null;

    const horaEntrada = horaEntradaParsed.isValid() ? horaEntradaParsed.format('HH:mm') : '--';
    const horaSalida = horaSalidaParsed && horaSalidaParsed.isValid() ? horaSalidaParsed.format('HH:mm') : '--';

    return (
      <View style={styles.itemContainer}>
        <Clock size={24} color="#FFFFFF" style={styles.icon} />
        <View style={styles.itemContent}>
          <Text style={styles.employeeName}>{item.usuario.username}</Text>
          <Text style={styles.times}>
            {fecha}{horaEntrada} - {horaSalida}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Control de Asistencia</Text>
      <FlatList
        data={assists}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#191919',
    paddingHorizontal: 12,
  },
  icon: {
    fontSize: 24,
    color: '#4A90E2',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
  times: {
    fontSize: 14,
    color: '#99999999',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
});