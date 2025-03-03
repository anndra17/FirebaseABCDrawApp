import React from 'react';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase/firebaseConfig';
import * as SecureStore from 'expo-secure-store';
import BottomSheet from '../components/BottomSheet';
import { useRouter } from 'expo-router';

const backgroundImage = require('../assets/images/appBackground.jpg');

const App = () => {
  const [status, setStatus] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authenticated, setAuthenticated] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const auth = getAuth(app);
  const router = useRouter()

  const handleLogin = () => {
    if(email == '' || password == ''){
      return alert('Password and email are required');
    }

    signInWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
        const user = userCredentials.user;

        await SecureStore.setItemAsync('user', JSON.stringify(user));
        setAuthenticated(true);

        router.replace('/(tabs)/home');
        
    }).catch((e) => {
      console.log(e);
      setErrorMessage('Emailul sau parola sunt greșite. Te rugăm să încerci din nou.');
      alert('Emailul sau parola sunt greșite. Te rugăm să încerci din nou.');
    })
  }


  return(
    <ImageBackground source={backgroundImage} style={styles.background}>
     
    
    <View style={ styles.container }>
      
        <>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Login Here</Text>
        <View style={{ marginTop: 20, width: '100%', paddingHorizontal: 25 }}>
            <TextInput 
                placeholder='Enter Email'
                style={ styles.input }
                onChangeText={setEmail}
            />

            <TextInput 
                placeholder='Enter Password'
                style={ styles.input }
                secureTextEntry={ true }
                onChangeText={setPassword}
            /> 
        </View>
        <TouchableOpacity 
          onPress={handleLogin}
          style={ styles.button }
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setStatus(true)}
        >
          <Text>Create Account</Text>
        </TouchableOpacity>
      </>
      { status && <BottomSheet setStatus={ setStatus } /> }

      
    </View>
    </ImageBackground>
  )
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#40A2E3',
    marginTop: 10,
    marginBottom: 15
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bcbcbc',
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Asigură afișarea completă
    justifyContent: 'center',
  }
})