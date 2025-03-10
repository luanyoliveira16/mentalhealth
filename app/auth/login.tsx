import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY_USUARIOS } from "../../config.json";


export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(`${API_KEY_USUARIOS}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });

            if (response.ok) {
                const responseJson = await response.json();

                const userId = responseJson.userId;

                if (userId) {
                    await AsyncStorage.setItem('userId', userId.toString());
                    router.push(`(tabs)/home`);
                } else {
                    Alert.alert('Erro', 'ID do usuário não encontrado');
                }
            } else {
                const errorText = await response.text();
                Alert.alert('Erro', errorText || 'Falha ao fazer login');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao tentar se autenticar');
            console.error(error);
        }
    };

    const handleRegister = () => {
        router.push('auth/register');
    };

    const handleRecuperation = () => {
        router.push('auth/recuperation');
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.logo}>mental health</Text>

            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="gray" style={styles.icon} />
                <TextInput
                    placeholder="Senha"
                    style={styles.input}
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRecuperation}>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.register}>Primeira vez? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#5271FF',
        marginVertical: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '100%',
        height: 50,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#5271FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        fontSize: 14,
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
    register: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
