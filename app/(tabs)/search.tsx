import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const professionals = [
    { id: '1', name: 'Dr. João', specialty: 'Psicologia', price: 150, image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Dra. Maria', specialty: 'Psiquiatria', price: 200, image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Dr. Pedro', specialty: 'Psicologia', price: 180, image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Dra. Ana', specialty: 'Psicologia', price: 220, image: 'https://via.placeholder.com/100' },
    { id: '5', name: 'Dr. Carlos', specialty: 'Psiquiatria', price: 250, image: 'https://via.placeholder.com/100' },
];

export default function SearchProfessionals() {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleSearch = () => {
        let filtered = professionals;

        if (name) {
            filtered = filtered.filter((professional) =>
                professional.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (specialty) {
            filtered = filtered.filter((professional) =>
                professional.specialty.toLowerCase().includes(specialty.toLowerCase())
            );
        }

        if (maxPrice) {
            filtered = filtered.filter((professional) => professional.price <= parseInt(maxPrice, 10));
        }

        setFilteredProfessionals(filtered);
    };

    const clearFilters = () => {
        setName('');
        setSpecialty('');
        setMaxPrice('');
        setFilteredProfessionals(professionals);
    };

    const openModal = (professional) => {
        setSelectedProfessional(professional);
        setModalVisible(true);
    };

    const handleAgendarConsulta = () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Erro', 'Por favor, escolha a data e o horário para agendar.');
            return;
        }
        Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
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
                placeholder="Preço até"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={clearFilters}>
                <Text style={styles.buttonText}>Limpar Filtros</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredProfessionals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)} style={styles.professionalCard}>
                        <Text style={styles.professionalName}>{item.name}</Text>
                        <Text style={styles.professionalSpecialty}>{item.specialty}</Text>
                        <Text style={styles.professionalPrice}>R$ {item.price}</Text>
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
                                source={{ uri: selectedProfessional.image }}
                                style={styles.modalImage}
                            />

                            <Text style={styles.modalName}>{selectedProfessional.name}</Text>
                            <Text style={styles.modalSpecialty}>{selectedProfessional.specialty}</Text>
                            <Text style={styles.modalPrice}>R$ {selectedProfessional.price}</Text>
                            <Text style={styles.modalDescription}>Descrição do profissional...</Text>
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
        fontWeight: 'bold',
        color: '#5271FF',
    },
    noResults: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    modalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5271FF',
        marginBottom: 20,
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
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
