import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName('Ana Paula');
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
            </View>

            <Image
                source={{ uri: '' }}
                style={styles.userImage}
            />

            {/* Circular Button */}
            <TouchableOpacity style={styles.circularButton}>
                <MaterialIcons name="add" size={30} color="white" />
            </TouchableOpacity>

            {/* Olá, Nome */}
            <Text style={styles.greeting}>Olá, {userName}</Text>

            <Text style={styles.question}>Como você se sente hoje?</Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Estamos aqui para o que você precisar</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/agendar')}>
                <Text style={styles.buttonText}>Agendar Consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/historico')}>
                <Text style={styles.buttonText}>Histórico de Consultas</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Profissionais</Text>
            <View style={styles.sliderContainer}>
                <View style={styles.professional}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={styles.professionalImage}
                    />
                    <Text style={styles.professionalName}>Dr. João</Text>
                </View>
                <View style={styles.professional}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={styles.professionalImage}
                    />
                    <Text style={styles.professionalName}>Dra. Maria</Text>
                </View>
                <View style={styles.professional}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={styles.professionalImage}
                    />
                    <Text style={styles.professionalName}>Dr. Pedro</Text>
                </View>
            </View>
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
    circularButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        backgroundColor: '#5271FF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
