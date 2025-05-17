import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeft } from 'lucide-react-native' 


interface AppBarProps {
    title: string
}

export default function handleBackPress({ title }: AppBarProps) {
    const navigation = useNavigation()
    const handleBackPress = () => {
        navigation.goBack()
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <ChevronLeft size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* Placeholder para centrar el título */}
      <View style={styles.rightPlaceholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rightPlaceholder: {
    width: 32,
  },
});