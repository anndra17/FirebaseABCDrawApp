import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Pressable, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const BottomSheet = ({ setStatus }) => {
    const slide = React.useRef(new Animated.Value(300)).current;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const auth = getAuth();

    const slideUp = () => {
        Animated.timing(slide, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slide, {
            toValue: 300,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        slideUp();
    }, []);

    const closeModal = () => {
        slideDown();
        setTimeout(() => {
            setStatus(false);
        }, 800);
    };

    const handleSignUp = () => {
        if (email === '' || password === '') {
            return Alert.alert('Error', 'Email and password are required');
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Success', 'Account created successfully');
                closeModal();
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', error.message);
            });
    };

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: '40%' }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Create Account</Text>
                    <View style={{ marginTop: 20 }}>
                        <TextInput 
                            placeholder="Enter Email"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput 
                            placeholder="Enter Password"
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Pressable>
        </Pressable>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#40A2E3',
        alignItems: 'center',
        marginTop: 15,
    },
});
