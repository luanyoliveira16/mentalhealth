import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showInputs, setShowInputs] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleForgotPassword = () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, informe seu e-mail.');
            return;
        }

        setIsCodeSent(true);
        setShowInputs(true);
        setTimeout(() => {
            Alert.alert('Sucesso', 'Um código de verificação foi enviado para o seu e-mail.');
        }, 1000);
    };

    const handleVerifyCode = () => {
        if (!verificationCode) {
            Alert.alert('Erro', 'Por favor, informe o código de verificação.');
            return;
        }

        Alert.alert('Sucesso', 'Código verificado. Agora você pode redefinir sua senha!');
        setEmail('');
        setVerificationCode('');
        setShowInputs(false);
        setIsCodeSent(false);
    };

    useEffect(() => {
        setTimeout(() => setShowInputs(true), 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Esqueci minha senha</Text>

            {!isCodeSent && (
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            )}

            {!isCodeSent && (
                <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                    <Text style={styles.buttonText}>Enviar Link de Redefinição</Text>
                </TouchableOpacity>
            )}

            {showInputs && isCodeSent && (
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

            <TouchableOpacity style={styles.backToLogin} onPress={() => Alert.alert('Redirecionando', 'Voltando para a tela de login')}>
                <Text style={styles.backToLoginText}>Voltar ao login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //
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
