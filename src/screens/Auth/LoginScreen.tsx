import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { loginUser } from '../../api/authApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRound, Lock } from 'lucide-react-native'

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
          source={require('../../../assets/logo_blanco.png')}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.title}>Iniciar sesión</Text>

        <View style={styles.inputContainer}>
          <UserRound color="#FFFFFF" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChangeText={setUsername}
            placeholderTextColor="#b0b0b0"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color="#FFFFFF" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="#b0b0b0"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
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
    color: '#F3F5F7',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    width: '80%',
    height: 48,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#101010',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    width: '80%',
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  inputIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    color: '#F3F5F7',
    fontFamily: 'Inter_400Regular'
  },
})