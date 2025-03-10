import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

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
            const response = await fetch('https://mentalhealth-ebon.vercel.app/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });

            const responseJson = await response.json();

            if (response.ok) {
                const token = responseJson.token;

                router.push('(tabs)/home');
            } else {
                Alert.alert('Erro', responseJson.message || 'Falha ao fazer login');
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
            <Header />

            <View style={styles.contentContainer}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
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
