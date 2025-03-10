import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API_KEY_USUARIOS, API_KEY_PROFISSIONAIS } from '../../config.json';

export default function HomeScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [professionals, setProfessionals] = useState([]);

    const handleAgendar = () => {
        router.push('(tabs)/search');
    };
    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                Alert.alert('Erro', 'Usuário não encontrado. Faça o login novamente.');
                return;
            }

            const response = await fetch(`${API_KEY_USUARIOS}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseJson = await response.json();
            if (response.ok) {
                setUserName(responseJson.nome);
                setUserImage(responseJson.foto);
            } else {
                Alert.alert('Erro', responseJson.message || 'Falha ao carregar dados do usuário');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao pegar dados do usuário');
            console.error(error);
        }
    };

    const fetchProfessionals = async () => {
        try {
            const response = await fetch(API_KEY_PROFISSIONAIS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseJson = await response.json();
            if (response.ok) {
                setProfessionals(responseJson);
            } else {
                Alert.alert('Erro', responseJson.message || 'Falha ao carregar profissionais');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao pegar dados dos profissionais');
            console.error(error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUserData();
            fetchProfessionals();
        }, [])
    );

    const renderItem = ({ item }) => (
        <View style={styles.professional}>
            <Image
                source={{ uri: item.foto }}
                style={styles.professionalImage}
            />
            <Text style={styles.professionalName}>{item.nome}</Text>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}></View>

            <Image
                source={{ uri: userImage || '' }}
                style={styles.userImage}
            />

            {/* Olá, Nome */}
            <Text style={styles.greeting}>Olá, {userName}</Text>

            <Text style={styles.question}>Como você se sente hoje?</Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Estamos aqui para o que você precisar</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
                <Text style={styles.buttonText}>Agendar Consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('(tabs)/agenda')}>
                <Text style={styles.buttonText}>Histórico de Consultas</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Profissionais</Text>
            <FlatList
                data={professionals}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sliderContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 120,
        backgroundColor: '#5271FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 90,
        borderWidth: 3,
        borderColor: '#5271FF',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
    },
    infoBox: {
        backgroundColor: '#5271FF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 15,
        alignItems: 'center',
        width: '80%',
    },
    infoText: {
        color: 'white',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#5271FF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
        textAlign: 'left',
        paddingLeft: 20,
    },
    sliderContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    professional: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
    professionalImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    professionalName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
});
