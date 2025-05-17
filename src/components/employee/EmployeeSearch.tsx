import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { searchEmployees, Empleado } from '../../api/employeeApi';
import { Search } from 'lucide-react-native';

interface EmployeeSearchProps {
    placeholder?: string;
    onResults: (results: Empleado[]) => void;
    style?: object;
    inputStyle?: object;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({
    placeholder = "Buscar empleado...",
    onResults,
    style,
    inputStyle
}) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (query.trim().length === 0) {
                onResults([]);
                return;
            }
            setLoading(true);
            searchEmployees(query)
                .then(results => {
                    onResults(results);
                })
                .catch(error => {
                    console.error("Error al buscar empleados:", error);
                    onResults([]);
                })
                .finally(() => setLoading(false));
        }, 500); // Espera 500ms antes de ejecutar la búsqueda

        return () => clearTimeout(debounce);
    }, [query, onResults]);

    return (
        <View style={[styles.container, style]}>
            <Search size={24} color="#E0E0E0" />
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor="#E0E0E0"
                value={query}
                onChangeText={setQuery}
            />
            {loading && <ActivityIndicator style={styles.loader} />}
        </View>
    );
};

export default EmployeeSearch;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        backgroundColor: '#1f1f1f',
        borderRadius: 8,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        padding: 8,
        color: '#E0E0E0',
    },
    loader: {
        marginLeft: 8,
    },
});