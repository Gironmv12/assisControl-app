import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchSchedulesEmployees, ScheduleEmployee } from '../../api/schedules_employees'

export default function Schedules() {
    const [schedules, setSchedules] = useState<ScheduleEmployee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadSchedules()
    }, [])

    async function loadSchedules() {
        try {
            const tokenData = await AsyncStorage.getItem('authData')
            if (!tokenData) throw new Error('No se encontró token')
            const { token } = JSON.parse(tokenData)
            const data = await fetchSchedulesEmployees(token)
            setSchedules(data)
        } catch (e: any) {
            console.error(e)
            setError(e.message || 'Error al cargar horarios')
        } finally {
            setLoading(false)
        }
    }

    // Helper para convertir "HH:mm:ss" en "HH:MM AM/PM"
    function formatHour(time: string) {
        const [hh, mm] = time.slice(0, 5).split(':')
        let hour = parseInt(hh, 10)
        const suffix = hour < 12 ? 'AM' : 'PM'
        hour = hour % 12 || 12
        return `${hour}:${mm} ${suffix}`
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Cargando horarios...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorTitle}>¡Ups! 😕</Text>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <>
            <View style={styles.center}>
                <Text style={styles.errorTitle}>Horarios disponibles</Text>
                <Text style={styles.errorText}>Estos son tus horarios asignados.</Text>
            </View>
            <FlatList
                data={schedules}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={schedules.length === 0 ? styles.center : styles.list}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.day}>{item.dia_semana}</Text>
                        <Text style={styles.time}>
                            {formatHour(item.hora_inicio)} – {formatHour(item.hora_fin)}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyTitle}>Sin horarios asignados</Text>
                        <Text style={styles.emptyText}>Aún no tienes horarios disponibles.</Text>
                    </View>
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    center: {
        backgroundColor: '#181818',
        borderRadius: 8,
        padding: 16,
        borderColor: '#262626',
        borderWidth: 1,
    },
    loadingText: {
        color: '#CCCCCC',
        marginTop: 10,
        fontSize: 16
    },
    errorTitle: {
        fontSize: 20,
        color: '#f3f5f7',
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    errorText: {
        color: '#AAAAAA',
        fontSize: 16,
        textAlign: 'center'
    },
    list: {
        paddingVertical: 16,
        backgroundColor: '#101010'
    },
    row: {
        backgroundColor: '#262626',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2
    },
    day: {
        color: '#F3F5F7',
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 6
    },
    time: {
        color: '#8E8E93',
        fontSize: 16
    },
    emptyTitle: {
        color: '#F3F5F7',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4
    },
    emptyText: {
        color: '#AAAAAA',
        fontSize: 14,
        textAlign: 'center'
    }
})