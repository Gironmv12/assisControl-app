import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchMyProfile, ProfileResponse } from '../../api/perfilEmployee'
import { UserRound, IdCard, Mail, Phone, Briefcase, Building2, Users, AtSign } from 'lucide-react-native'

export default function ProfileScreen() {
  const [profile, setProfile] = useState<ProfileResponse|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const auth = await AsyncStorage.getItem('authData')
      if (!auth) throw new Error('No se encontró token')
      const { token } = JSON.parse(auth)
      const data = await fetchMyProfile(token)
      setProfile(data)
    } catch (e: any) {
      console.error(e)
      setError(e.message || 'Error al cargar perfil')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3478F6" />
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  // Extraer iniciales para avatar
  const initials = [
    profile!.datos_personales.nombre.charAt(0),
    profile!.datos_personales.apellido_paterno.charAt(0)
  ].join('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>
            {profile!.datos_personales.nombre}{' '}
            {profile!.datos_personales.apellido_paterno}
          </Text>
          <Text style={styles.username}>@{profile!.datos_cuenta.username}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.card}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <UserRound color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Usuario</Text>
                <Text style={styles.infoValue}>{profile!.datos_cuenta.username}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <IdCard color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>ID</Text>
                <Text style={styles.infoValue}>{profile!.datos_cuenta.id}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
          <View style={styles.card}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <UserRound color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nombre Completo</Text>
                <Text style={styles.infoValue}>
                  {profile!.datos_personales.nombre}{' '}
                  {profile!.datos_personales.apellido_paterno}{' '}
                  {profile!.datos_personales.apellido_materno}
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Mail color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Correo</Text>
                <Text style={styles.infoValue}>{profile!.datos_personales.correo}</Text>
              </View>
            </View>
            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
              <View style={styles.iconContainer}>
                <Phone color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Teléfono</Text>
                <Text style={styles.infoValue}>{profile!.datos_personales.telefono}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Laboral</Text>
          <View style={styles.card}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Briefcase color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Puesto</Text>
                <Text style={styles.infoValue}>{profile!.informacion_laboral.puesto}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer} >
                <Building2 color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Departamento</Text>
                <Text style={styles.infoValue}>{profile!.informacion_laboral.departamento}</Text>
              </View>
            </View>
            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
              <View style={styles.iconContainer} >
                <Users color="#ffffff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>No. Identificador</Text>
                <Text style={styles.infoValue}>
                  {profile!.informacion_laboral.numero_identificador}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#181818',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3478F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F5F7',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F3F5F7',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#181818',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 120, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#F3F5F7',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})