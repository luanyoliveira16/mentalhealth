import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header} />
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 120,
        backgroundColor: '#5271FF',
    },
});
