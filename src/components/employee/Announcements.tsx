//// filepath: c:\Users\Giron\Desktop\app_assist_control\src\components\employee\Announcements.tsx
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResumen } from '../../api/dashboardEmployee';
import { Bell } from 'lucide-react-native';

export default function Announcements() {
  const [avisos, setAvisos] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const authData = await AsyncStorage.getItem('authData');
        if (authData) {
          const { token } = JSON.parse(authData);
          const data = await getResumen(token);
          setAvisos(data.avisos); // data.avisos es un string | null
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (avisos === null) {
    return <Text>Cargando avisos...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bell width={24} height={24} color="#FFFFFF" />
        <Text style={styles.title}>Avisos Importantes</Text>
      </View>
      <Text style={styles.announcementText}>{avisos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: '#262626',
    borderWidth: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    color: '#F3F5F7',
    marginLeft: 8,
    fontWeight: '600'
  },
  announcementText: {
    color: '#8E8E93',
    fontSize: 14,
  }
});