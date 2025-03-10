import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UserRegistration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [photo, setPhoto] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setPhoto(result.uri);
        }
    };

    const handleRegister = () => {
        if (!name || !email || !password || !birthdate) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário</Text>

            <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
                {photo ? (
                    <Image source={{ uri: photo }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.photoText}>Selecionar Foto</Text>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento"
                value={birthdate}
                onChangeText={setBirthdate}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#5271FF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    photoContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#f0f0f0',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    photoText: {
        color: '#888',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
