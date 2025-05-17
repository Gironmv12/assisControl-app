import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { loginUser } from '../../api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password)
      // Guarda la respuesta de autenticación en AsyncStorage
      await AsyncStorage.setItem('authData', JSON.stringify(data))
      if (data.rol === 'admin') {
        navigation.navigate('AdminStack')
      } else {
        navigation.navigate('EmployeeStack')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('../../../assets/logo_azul.png')}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    color: '#000',
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0064e0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  }
})