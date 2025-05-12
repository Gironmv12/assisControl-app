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
        <ChevronLeft size={24} color="#000" />
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  rightPlaceholder: {
    width: 32,
  },
});