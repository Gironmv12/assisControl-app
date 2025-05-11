import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ellipsis } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';

interface HeaderAppProps {
  title: string;
}

export default function HeaderApp({ title }: HeaderAppProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [persona, setPersona] = useState<{ nombre: string; apellido_paterno: string }>({
    nombre: '',
    apellido_paterno: ''
  });

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchAuthData() {
      const authDataString = await AsyncStorage.getItem('authData');
      if (authDataString) {
        const authData = JSON.parse(authDataString);
        setPersona({
          nombre: authData.persona.nombre,
          apellido_paterno: authData.persona.apellido_paterno,
        });
      }
    }
    fetchAuthData();
  }, []);

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>{title}</Text>
        <Text style={styles.nameText}>
          {persona.nombre} {persona.apellido_paterno}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Ellipsis size={24} color="#141c1e" />
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.dropdownItem}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#f0f4f7',
    borderRadius: 4,
    zIndex: 1000,
    minWidth: 150,
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
});