import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { fetchAssistDay } from '../../api/dashboardAdmin';
import { Users, UserX } from 'lucide-react-native';

const TOTAL_EMPLEADOS = 10;

export default function AssisDay() {
  const [presentes, setPresentes] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAssistDay();
        const uniqueUsers = new Set(data.map((item: any) => item.usuario.id));
        setPresentes(uniqueUsers.size);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }, []);

  const ausentes = TOTAL_EMPLEADOS - presentes;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Users color="#1f1f1f" size={40} style={styles.icon} />
        <Text style={styles.number}>{presentes}</Text>
        <Text style={styles.label}>Presentes</Text>
      </View>
      <View style={styles.card}>
        <UserX color="#1f1f1f" size={40} style={styles.icon} />
        <Text style={styles.number}>{ausentes}</Text>
        <Text style={styles.label}>Ausentes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginBottom: 12,
  },
  number: {
    fontSize: 36,
    color: '#000',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },
});