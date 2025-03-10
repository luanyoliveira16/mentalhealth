import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API_KEY_USUARIOS } from '../../config.json';
import { useRouter } from 'expo-router';


export default function ForgotPassword() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, informe seu e-mail.');
            return;
        }
        try {
            const response = await fetch(`${API_KEY_USUARIOS}/request-password-change`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                setIsCodeSent(true);
                Alert.alert('Sucesso', 'Um código de verificação foi enviado para o seu e-mail.');
            } else {
                Alert.alert('Erro', data.message || 'Falha ao enviar código.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao conectar ao servidor.');
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            Alert.alert('Erro', 'Por favor, informe o código de verificação.');
            return;
        }
        setIsVerified(true);
        Alert.alert('Sucesso', 'Código verificado. Agora você pode redefinir sua senha!');
    };

    const handleResetPassword = async () => {
        if (!newPassword) {
            Alert.alert('Erro', 'Por favor, informe a nova senha.');
            return;
        }
        try {
            const response = await fetch(`${API_KEY_USUARIOS}/verify-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: verificationCode, novaSenha: newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
                setEmail('');
                setVerificationCode('');
                setNewPassword('');
                setIsCodeSent(false);
                setIsVerified(false);
            } else {
                Alert.alert('Erro', data.message || 'Falha ao redefinir senha.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao conectar ao servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Esqueci minha senha</Text>
            {!isCodeSent && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                        <Text style={styles.buttonText}>Enviar Código</Text>
                    </TouchableOpacity>
                </>
            )}
            {isCodeSent && !isVerified && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o código de verificação"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                        <Text style={styles.buttonText}>Verificar Código</Text>
                    </TouchableOpacity>
                </>
            )}
            {isVerified && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua nova senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                        <Text style={styles.buttonText}>Redefinir Senha</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.backToLogin} onPress={() => router.push('auth/login')}>
                <Text style={styles.backToLoginText}>Voltar ao login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
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
        width: '100%',
    },
    button: {
        backgroundColor: '#5271FF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 25,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backToLogin: {
        marginTop: 10,
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#5271FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});