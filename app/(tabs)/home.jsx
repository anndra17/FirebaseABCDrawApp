import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { categories } from '../data/categories';
import WritingCanvas from '../../components/WritingCanvas'; 

const backgroundImage = require('../../assets/images/appBackground.jpg');

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);  // Resetează selecția la null pentru a reveni la lista de categorii
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {selectedCategory ? (
          // Dacă o categorie este selectată, afișează conținutul asociat
          <View style={styles.gameContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBackToCategories}
            >
              <Text style={styles.buttonText}>Înapoi</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Categoria: {selectedCategory.replace('_', ' ')}</Text>
            <Image source={{ uri: categories[selectedCategory].image }} style={styles.image} />
            <Text style={styles.word}>{categories[selectedCategory].word}</Text>

            {/* Aici poți adăuga canvas-ul pentru scris */}
            <WritingCanvas selectedCategory={selectedCategory} />
          </View>
        ) : (
          // Dacă nu s-a selectat nicio categorie, afișează butoanele
          <>
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
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
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
  gameContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ff6347', // O culoare pentru butonul de înapoi
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
