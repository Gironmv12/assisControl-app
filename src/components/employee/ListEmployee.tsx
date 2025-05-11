import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { fecthEmployees, EmpleadoDatos } from '../../api/employeeApi'
import { AdminStackParamList } from '../../navigation/AdminStack'

export default function ListEmployee() {
    const [employees, setEmployees] = useState<EmpleadoDatos[]>([])
    const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>()

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await fecthEmployees()
                setEmployees(data)
            } catch (error) {
                console.error("Error loading employees:", error)
            }
        }
        loadEmployees()
    }, [])

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
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={employees}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
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
})