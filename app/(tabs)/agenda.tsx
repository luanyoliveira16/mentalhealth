import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY_AGENDAMENTOS, API_KEY_PROFISSIONAIS } from '../../config.json'
import { useFocusEffect } from '@react-navigation/native';

const formatDate = (dateString) => {
    if (!dateString) return 'Data inválida';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Data inválida';
    }

    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

export default function Agenda() {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchConsultations = async () => {
        try {
            setLoading(true);
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                Alert.alert('Erro', 'Usuário não encontrado.');
                return;
            }

            const response = await fetch(`${API_KEY_AGENDAMENTOS}/paciente/${userId}`);
            const data = await response.json();

            const enrichedConsultations = await Promise.all(
                data.map(async (consultation) => {
                    const professionalResponse = await fetch(`${API_KEY_PROFISSIONAIS}/${consultation.profissional_id}`);
                    const professionalData = await professionalResponse.json();
                    return {
                        ...consultation,
                        profissionalNome: professionalData.nome,
                        horario: consultation.horario
                    };
                })
            );

            setConsultations(enrichedConsultations);
        } catch (error) {
            console.error('Erro ao buscar consultas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsultations();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchConsultations();
        }, [])
    );

    const separateByStatus = (consultationsList) => {
        return {
            agendadas: consultationsList.filter((item) => item.status === 'agendado'),
            realizadas: consultationsList.filter((item) => item.status === 'realizado'),
            canceladas: consultationsList.filter((item) => item.status === 'cancelado'),
        };
    };

    const handleCancelConsultation = async (id) => {
        Alert.alert('Cancelar Consulta', 'Tem certeza que deseja cancelar essa consulta?', [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await fetch(`${API_KEY_AGENDAMENTOS}/${id}`, { method: 'DELETE' });
                        fetchConsultations();
                        Alert.alert('Consulta cancelada!');
                    } catch (error) {
                        Alert.alert('Erro ao cancelar consulta', error.message);
                    }
                },
            },
        ]);
    };

    const { agendadas, realizadas, canceladas } = separateByStatus(consultations);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Consultas</Text>

            {loading ? (
                <Text style={styles.loading}>Carregando...</Text>
            ) : (
                agendadas.length === 0 && realizadas.length === 0 && canceladas.length === 0 ? (
                    <Text style={styles.noConsultations}>Nenhuma consulta encontrada.</Text>
                ) : (
                    ['agendadas', 'realizadas', 'canceladas'].map((status) => (
                        { agendadas, realizadas, canceladas }[status].length > 0 && (
                            <View key={status} style={styles.section}>
                                <Text style={styles.sectionTitle}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
                                <FlatList
                                    data={{ agendadas, realizadas, canceladas }[status]}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <Text style={styles.cardText}>Profissional: {item.profissionalNome}</Text>
                                            <Text style={styles.cardText}>Data: {formatDate(item.data_agendamento)}</Text>
                                            <Text style={styles.cardText}>Horário: {item.horario}</Text>
                                            {status === 'agendadas' && (
                                                <TouchableOpacity style={styles.button} onPress={() => handleCancelConsultation(item.id)}>
                                                    <Text style={styles.buttonText}>Cancelar</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}
                                />
                            </View>
                        )
                    ))
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f7f9fc' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 },
    loading: { fontSize: 18, textAlign: 'center', marginTop: 20 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#5271FF', marginBottom: 10 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
    cardText: { fontSize: 16, color: '#333' },
    button: { backgroundColor: '#FF6347', padding: 8, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
    noConsultations: { fontSize: 18, textAlign: 'center', color: 'gray', marginTop: 20 },
});
