import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fecthEmployees, EmpleadoDatos, Empleado } from '../../api/employeeApi';
import { AdminStackParamList } from '../../navigation/AdminStack';

import EmployeeSearch from './EmployeeSearch';

export type ListEmployeeRef = {
  reloadEmployees: () => Promise<void>;
};

const ListEmployee = forwardRef<ListEmployeeRef>((_, ref) => {
    const [employees, setEmployees] = useState<EmpleadoDatos[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

    const loadEmployees = async () => {
        try {
            const data = await fecthEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadEmployees().then(() => setRefreshing(false));
    }, []);

    // Exponemos la función reloadEmployees para que el parent la pueda llamar.
    useImperativeHandle(ref, () => ({
        reloadEmployees: async () => {
            setRefreshing(true);
            await loadEmployees();
            setRefreshing(false);
        },
    }));

    // Función para actualizar el listado cuando se efectúa una búsqueda.
    const handleSearchResults = (results: Empleado[]) => {
        if (results.length === 0) {
            // Si no hay búsqueda activa, recargamos la lista completa.
            loadEmployees();
        } else {
            // Mapeamos los resultados al tipo EmpleadoDatos.
            const mapped: EmpleadoDatos[] = results.map(employee => ({
                id: employee.id,
                nombre: employee.usuario.persona.nombre,
                apellido_paterno: employee.usuario.persona.apellido_paterno,
                apellido_materno: employee.usuario.persona.apellido_materno,
                puesto: employee.puesto,
                departamento: employee.departamento,
            }));
            setEmployees(mapped);
        }
    };

    const renderItem = ({ item }: { item: EmpleadoDatos }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('DetailsEmployee', { id: item.id })}>
                <View style={styles.card}>
                    <View style={styles.profileCircle}>
                        <Text style={styles.profileLetter}>
                            {item.nombre.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.fullName}>
                            {item.nombre} {item.apellido_paterno} {item.apellido_materno}
                        </Text>
                        <Text style={styles.detail}>{item.puesto}</Text>
                        <Text style={styles.detail}>{item.departamento}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <EmployeeSearch 
                onResults={handleSearchResults}
                placeholder="Buscar por nombre o apellido"
                style={styles.searchContainer}
                inputStyle={styles.searchInput}
            />
            <FlatList
                data={employees}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListFooterComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('EmpleadoFormScreen')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Crear Empleado</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
});

export default ListEmployee;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        marginBottom: 12,
    },
    searchInput: {
        // Personaliza el estilo del input según tus necesidades
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#191919',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
    profileCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    profileLetter: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    info: {
        flex: 1,
    },
    fullName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#fff',
    },
    detail: {
        fontSize: 14,
        color: '#999999',
    },
    buttonContainer: {
    backgroundColor: '#0064e0',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
    fontFamily: 'Inter-Medium',
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF',
    },
});