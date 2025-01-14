import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { categories } from '../data/categories';

const backgroundImage = require('../../assets/images/appBackground.jpg');

export default function Home() {
  const router = useRouter();

  const handleCategorySelect = (category) => {
    router.push({ pathname: '/game', params: { category } });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Selectează o categorie:</Text>

        {Object.keys(categories).map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.buttonText}>{category.replace('_', ' ')}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Asigură că imaginea acoperă întregul ecran
    resizeMode: 'cover', // Asigură că imaginea acoperă complet fundalul
    justifyContent: 'center',
  },
  container: {
    flex: 1, // Permite containerului să ocupe întreg spațiul disponibil
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
