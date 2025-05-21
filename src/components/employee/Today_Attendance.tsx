import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BadgeX, BadgeCheck } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResumen } from '../../api/dashboardEmployee';

export default function Today_Attendance() {
  const [asistenciaHoy, setAsistenciaHoy] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const authData = await AsyncStorage.getItem('authData');
        if (authData) {
          const { token } = JSON.parse(authData);
          const data = await getResumen(token);
          setAsistenciaHoy(data.asistencia_hoy);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (asistenciaHoy === null) {
    return <Text>Cargando...</Text>;
  }

  const borderColor = asistenciaHoy ? '#22c55e' : '#f87171'; // verde claro y rojo claro
const Icon = asistenciaHoy ? BadgeCheck : BadgeX;

return (
  <View style={[styles.card]}>
    <Icon width={24} height={24} color={borderColor} />
    <Text style={styles.text}>
      {asistenciaHoy
        ? 'Has registrado tu asistencia correctamente hoy.'
        : 'No se ha registrado tu asistencia para el día de hoy.'}
    </Text>
  </View>
);
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    backgroundColor: '#181818', // más sobrio y consistente con fondo #101010
    borderColor: '#262626',
    borderWidth: 1,
  },
  text: {
    color: '#F3F5F7',
    fontSize: 16,
  }
});
