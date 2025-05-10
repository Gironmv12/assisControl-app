import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { fetchAssistDay } from '../../api/dashboardAdmin';
import { Clock } from 'lucide-react-native';

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

export default function AssisRegistered() {
  const [assists, setAssists] = useState<Assist[]>([]);

  useEffect(() => {
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

    getData();
  }, []);

  const renderItem = ({ item }: { item: Assist }) => {
    // Se define el formato de llegada (con 5 decimales)
    const formatString = 'HH:mm:ss.SSSSS';
    //se define fecha
    const fecha = dayjs(item.fecha).format('DD/MM/YYYY') + ' | ';
    const horaEntrada = dayjs(item.hora_entrada, formatString).format('HH:mm');
    const horaSalida = item.hora_salida
      ? dayjs(item.hora_salida, formatString).format('HH:mm')
      : '--';

    return (
      <View style={styles.itemContainer}>
        <Clock size={24} color="#4A90E2" style={styles.icon} />
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
    fontFamily: 'Inter_600SemiBold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
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
    color: '#333',
    fontFamily: 'Inter_600SemiBold',
  },
  times: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
    timeLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
        fontFamily: 'Inter_400Regular',
    },
});