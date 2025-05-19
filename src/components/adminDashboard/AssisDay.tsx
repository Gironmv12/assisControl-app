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
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Users color="#FFFFFF" size={32} style={styles.icon} />
        <Text style={styles.statValue}>{presentes}</Text>
        <Text style={styles.statLabel}>Presentes</Text>
      </View>
      <View style={styles.statCard}>
        <UserX color="#FFFFFF" size={32} style={styles.icon} />
        <Text style={styles.statValue}>{ausentes}</Text>
        <Text style={styles.statLabel}>Ausentes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Equivale a SIZES.spacing * 2 (8*2)
    marginVertical: 16,    // Equivale a SIZES.spacing * 2
  },
  statCard: {
    flex: 1,
    backgroundColor: '#181818', // Color primario claro
    borderRadius: 8,            // Equivale a SIZES.radiusMedium
    padding: 16,                // Equivale a SIZES.spacing * 2
    marginHorizontal: 4,        // Equivale a SIZES.spacing / 2 (8/2)
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter_600SemiBold', // Fuente bold
    fontSize: 28,              // Equivale a SIZES.h2
    color: '#f4f5f7',          // Color primario
  },
  statLabel: {
    fontFamily: 'Inter_400Regular', // Fuente regular
    fontSize: 14,                 // Equivale a SIZES.body3
    color: '#999999',             // Gris oscuro
    marginTop: 8,                 // Equivale a SIZES.spacing / 2
  },
  icon: {
    marginBottom: 12,
  },
});