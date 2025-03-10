import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UserProfile() {
    const [name, setName] = useState('João Silva');
    const [email, setEmail] = useState('joao@exemplo.com');
    const [password, setPassword] = useState('123456');
    const [birthdate, setBirthdate] = useState('1990-01-01'); o
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

    const saveProfile = () => {
        if (!name || !email || !password || !birthdate) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu Perfil</Text>

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

            <TouchableOpacity style={styles.button} onPress={saveProfile}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
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
    photoContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    photoText: {
        color: '#666',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
