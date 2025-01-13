import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

export default function Profile() {
    const auth = getAuth(app);
    const user = auth.currentUser;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Page</Text>
            {user ? (
                <Text style={styles.email}>Email: {user.email}</Text>
            ) : (
                <Text style={styles.error}>No user is logged in.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    email: {
        fontSize: 18,
        color: '#333',
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
});
