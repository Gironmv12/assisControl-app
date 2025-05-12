import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fecthEmployees, EmpleadoDatos } from '../../api/employeeApi';
import { AdminStackParamList } from '../../navigation/AdminStack';

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
        <FlatList
            data={employees}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={
                <TouchableOpacity onPress={() => navigation.navigate('EmpleadoFormScreen')}>
                    <Text style={styles.buttonText}>Crear Empleado</Text>
                </TouchableOpacity>
            }
        />
    );
});

export default ListEmployee;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
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
    },
    detail: {
        fontSize: 14,
        color: '#555',
    },
    buttonText: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: 8,
        borderRadius: 4,
        textAlign: 'center',
        marginVertical: 16,
    },
});