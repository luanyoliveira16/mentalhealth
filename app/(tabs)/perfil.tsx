import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY_USUARIOS, API_KEY_FOTOS } from '../../config.json'

const UpdateProfile: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [foto, setFoto] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    const formatDate = (date: string) => {
        const parts = date.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return date;
    };

    const handleDataNascimentoChange = (value: string) => {
        const formattedValue = value.replace(/[^0-9\/]/g, '').slice(0, 10);
        if (formattedValue.length === 2 || formattedValue.length === 5) {
            setDataNascimento(formattedValue + '/');
        } else {
            setDataNascimento(formattedValue);
        }
    };

    const uploadPhoto = async (userId: string) => {
        if (!foto) {
            return;
        }

        try {
            const formData = new FormData();
            const localUri = foto;
            const filename = localUri.split('/').pop();
            const type = 'image/jpeg';

            formData.append('image', { uri: localUri, name: filename, type });

            const imgbbUrl = API_KEY_FOTOS;

            const imgbbResponse = await fetch(imgbbUrl, {
                method: 'POST',
                body: formData,
            });

            const imgbbJson = await imgbbResponse.json();

            if (imgbbJson.success) {
                const imageUrl = imgbbJson.data.url;
                await updateUserWithPhoto(userId, imageUrl);
            } else {
                Alert.alert('Erro', 'Erro ao enviar foto para o Imgbb');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao enviar foto para o Imgbb');
            console.error(error);
        }
    };

    const updateUserWithPhoto = async (userId: string, imageUrl: string) => {
        try {
            const response = await fetch(`${API_KEY_USUARIOS}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Charset': 'utf-8',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    data_nascimento: formatDate(dataNascimento),
                    foto: imageUrl,
                }),
            });

            const responseJson = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            } else {
                Alert.alert('Erro', responseJson.message || 'Erro ao atualizar perfil');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao atualizar perfil no servidor');
            console.error(error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                await uploadPhoto(userId);
            } else {
                Alert.alert('Erro', 'Usuário não encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao acessar o usuário.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar Perfil</Text>

            <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
                {foto ? (
                    <Image source={{ uri: foto }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.photoText}>Selecionar Foto</Text>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
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
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento (DD/MM/YYYY)"
                value={dataNascimento}
                onChangeText={handleDataNascimentoChange}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Atualizar Perfil</Text>
            </TouchableOpacity>
        </View>
    );
};

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

export default UpdateProfile;
