import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
};

const consultations = [
    { id: '1', patientName: 'João Silva', date: '2025-03-08T10:00:00', status: 'agendada' },
    { id: '2', patientName: 'Maria Oliveira', date: '2025-03-08T14:00:00', status: 'realizada' },
    { id: '3', patientName: 'Pedro Souza', date: '2025-03-08T16:00:00', status: 'cancelada' },
    { id: '4', patientName: 'Ana Lima', date: '2025-03-07T10:00:00', status: 'agendada' },
    { id: '5', patientName: 'Carlos Pereira', date: '2025-03-07T16:00:00', status: 'realizada' },
    { id: '6', patientName: 'Fernanda Costa', date: '2025-03-07T18:00:00', status: 'cancelada' },
];

export default function Agenda() {
    const [yesterday, setYesterday] = useState<string>('');
    const [filteredConsultations, setFilteredConsultations] = useState<any[]>([]);

    useEffect(() => {
        const dateYesterday = new Date();
        dateYesterday.setDate(dateYesterday.getDate() - 1);
        setYesterday(formatDate(dateYesterday.toISOString()));

        const consultationsYesterday = consultations.filter((consultation) =>
            formatDate(consultation.date) === yesterday
        );

        setFilteredConsultations(consultationsYesterday);
    }, [yesterday]);

    const separateByStatus = (consultationsList: any[]) => {
        return {
            agendadas: consultationsList.filter((item) => item.status === 'agendada'),
            realizadas: consultationsList.filter((item) => item.status === 'realizada'),
            canceladas: consultationsList.filter((item) => item.status === 'cancelada'),
        };
    };

    const { agendadas, realizadas, canceladas } = separateByStatus(filteredConsultations);

    const handleCancelConsultation = (id: string) => {
        Alert.alert('Cancelar Consulta', `Você tem certeza que deseja cancelar essa consulta?`, [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: () => {
                    setFilteredConsultations((prevConsultations) =>
                        prevConsultations.map((consultation) =>
                            consultation.id === id ? { ...consultation, status: 'cancelada' } : consultation
                        )
                    );
                    Alert.alert('Consulta Cancelada', 'A consulta foi cancelada com sucesso!');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Consultas Agendadas</Text>

            {agendadas.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Consultas Agendadas</Text>
                    <FlatList
                        data={agendadas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardText}>
                                    {item.patientName} - {formatDate(item.date)} - {item.status}
                                </Text>
                                <TouchableOpacity style={styles.button} onPress={() => handleCancelConsultation(item.id)}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}

            {/* Consultas Realizadas */}
            {realizadas.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Consultas Realizadas</Text>
                    <FlatList
                        data={realizadas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardText}>
                                    {item.patientName} - {formatDate(item.date)} - {item.status}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}

            {canceladas.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Consultas Canceladas</Text>
                    <FlatList
                        data={canceladas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardText}>
                                    {item.patientName} - {formatDate(item.date)} - {item.status}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}

            {agendadas.length === 0 && realizadas.length === 0 && canceladas.length === 0 && (
                <Text style={styles.noConsultations}>Nenhuma consulta encontrada para ontem.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f9fc',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40, // Abaixado mais
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5271FF',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#FF6347',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    noConsultations: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
});
