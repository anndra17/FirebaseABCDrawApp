import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { useRouter } from 'expo-router';

export default function Settings() {
    const [newPassword, setNewPassword] = useState('');
    const auth = getAuth(app);
    const router = useRouter();

    // Logout handler
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                Alert.alert('Logged out', 'You have been logged out successfully!');
                router.replace('/'); // Ruta principală
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Failed to log out. Please try again.');
            });
    };
    

    // Change password handler
    const handleChangePassword = () => {
        if (newPassword.trim() === '') {
            return Alert.alert('Error', 'Password cannot be empty.');
        }

        const user = auth.currentUser;
        if (user) {
            updatePassword(user, newPassword)
                .then(() => {
                    Alert.alert('Success', 'Password updated successfully!');
                    setNewPassword(''); // Resetează input-ul
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Error', 'Failed to update password. Please try again.');
                });
        } else {
            Alert.alert('Error', 'No user is logged in.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings Page</Text>

            {/* Schimbare parolă */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Change Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
            </View>

            {/* Logout */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Logout</Text>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#40A2E3',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
