import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY_PROFISSIONAIS, API_KEY_AGENDAMENTOS } from '../../config.json';

export default function SearchProfessionals() {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [price, setPrice] = useState('');
    const [filteredProfessionals, setFilteredProfessionals] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId !== null) {
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error('Erro ao carregar o ID do usuário:', error);
            }
        };

        loadUserId();
    }, []);

    useEffect(() => {
        fetch(API_KEY_PROFISSIONAIS)
            .then((response) => response.json())
            .then((data) => {
                setFilteredProfessionals(data);
            })
            .catch((error) => console.error('Erro ao carregar profissionais:', error));
    }, []);

    const handleSearch = () => {
        let filtered = filteredProfessionals;

        if (name) {
            filtered = filtered.filter((professional) =>
                professional.nome.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (specialty) {
            filtered = filtered.filter((professional) =>
                professional.especialidade.toLowerCase().includes(specialty.toLowerCase())
            );
        }

        if (price) {
            filtered = filtered.filter((professional) => {
                const professionalPrice = parseFloat(professional.preco);
                const maxPrice = parseFloat(price);
                return professionalPrice <= maxPrice;
            });
        }

        setFilteredProfessionals(filtered);
    };

    const clearFilters = () => {
        setName('');
        setSpecialty('');
        setPrice('');
        fetch(API_KEY_PROFISSIONAIS)
            .then((response) => response.json())
            .then((data) => setFilteredProfessionals(data));
    };

    const openModal = (professional) => {
        setSelectedProfessional(professional);
        setModalVisible(true);
    };

    const handleAgendarConsulta = async () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Erro', 'Por favor, escolha a data e o horário para agendar.');
            return;
        }

        try {
            const response = await fetch(API_KEY_AGENDAMENTOS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paciente_id: userId,
                    profissional_id: selectedProfessional.id,
                    data_agendamento: selectedDate,
                    horario: selectedTime,
                    status: 'agendado',
                }),
            });

            if (response.ok) {
                const data = await response.json();
                Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
            } else {
                Alert.alert('Erro', 'Falha ao agendar consulta');
            }
        } catch (error) {
            console.error('Erro ao agendar consulta:', error);
            Alert.alert('Erro', 'Erro ao agendar consulta');
        }

        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Profissionais</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nome"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Buscar por especialidade"
                value={specialty}
                onChangeText={setSpecialty}
            />

            <TextInput
                style={styles.input}
                placeholder="Preço máximo"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={clearFilters}>
                <Text style={styles.buttonText}>Limpar Filtros</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredProfessionals}
                keyExtractor={(item) => item.registro_profissional.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)} style={styles.professionalCard}>
                        <Image
                            source={{ uri: item.foto }}
                            style={styles.professionalImage}
                        />
                        <Text style={styles.professionalName}>{item.nome} </Text>
                        <Text style={styles.professionalSpecialty}>{item.especialidade}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.noResults}>Nenhum profissional encontrado</Text>}
            />

            {selectedProfessional && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                source={{ uri: selectedProfessional.foto }}
                                style={styles.modalImage}
                            />

                            <Text style={styles.modalName}>{selectedProfessional.nome}</Text>
                            <Text style={styles.modalSpecialty}>{selectedProfessional.especialidade}</Text>
                            <Text style={styles.modalDescription}>{selectedProfessional.descricao}</Text>
                            <Text style={styles.modalPrice}>Preço por hora: R$ {selectedProfessional.preco}</Text>
                            <View style={styles.calendarContainer}>
                                <Text style={styles.text}>Escolha a data:</Text>
                                <Calendar
                                    onDayPress={(day) => setSelectedDate(day.dateString)}
                                    markedDates={{
                                        [selectedDate]: { selected: true, selectedColor: 'blue' },
                                    }}
                                />
                                {selectedDate && (
                                    <>
                                        <Text style={styles.text}>Escolha o horário:</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Horário (ex: 14:00)"
                                            onChangeText={setSelectedTime}
                                        />
                                    </>
                                )}
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleAgendarConsulta}>
                                <Text style={styles.buttonText}>Agendar Consulta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'red' }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 40,
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#5271FF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    professionalCard: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    professionalImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    professionalName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    professionalSpecialty: {
        fontSize: 16,
        color: '#777',
    },
    professionalPrice: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    noResults: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center', // Centraliza o modal na tela
        alignItems: 'center', // Alinha o conteúdo do modal ao centro
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    modalName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSpecialty: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    calendarContainer: {
        marginTop: 20,
        width: '100%',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});
