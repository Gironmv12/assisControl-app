import React, { useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import HeaderApp from '../../components/adminDashboard/HeaderNavbar';
import ListEmployee, { ListEmployeeRef } from '../../components/employee/ListEmployee';

export default function EmployeeDashboardScreen() {
  const listEmployeeRef = useRef<ListEmployeeRef>(null);

  useFocusEffect(
    useCallback(() => {
      listEmployeeRef.current?.reloadEmployees();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={{ flex: 1 }}>
         <HeaderApp title="Gestion de Empleados" />
         <ListEmployee ref={listEmployeeRef} />
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