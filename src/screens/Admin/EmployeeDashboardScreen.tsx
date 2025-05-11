import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderApp from '../../components/adminDashboard/HeaderNavbar';
import ListEmployee from '../../components/employee/ListEmployee';

export default function EmployeeDashboardScreen() {  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={{ flex: 1 }}>
         <HeaderApp title="Gestion de Empleados" />
         <ListEmployee />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  }
});