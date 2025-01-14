import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, Alert } from 'react-native';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { useRouter } from 'expo-router';

const backgroundImage = require('../../assets/images/appBackground.jpg');


export default function Settings() {
    const [newPassword, setNewPassword] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const user = auth.currentUser;


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
        <ImageBackground source={backgroundImage} style={styles.background}>

        <View style={styles.container}>
            {/* Schimbare parolă */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Email adress</Text>
                {user ? (
                    <Text style={styles.email}>{user.email}</Text>
                ) : (
                    <Text style={styles.error}>No user is logged in.</Text>
                )}
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
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 30,
        backgroundColor: 'white'
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
    logoutButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    email: {
        fontSize: 18,
        color: '#333',
        marginBottom:20,
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // Asigură afișarea completă
        justifyContent: 'center',
      },
});
