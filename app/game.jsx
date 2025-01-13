import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { categories } from './data/categories'; // importă fișierul cu categoriile
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // importă GestureHandlerRootView


const Game = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedObject, setSelectedObject] = useState('');
  const [image, setImage] = useState('');
  
  // Funcție care selectează un obiect aleatoriu dintr-o categorie
  const getRandomObject = (category) => {
    const objects = categories[category];
    const randomIndex = Math.floor(Math.random() * objects.length);
    return objects[randomIndex];
  };

  useEffect(() => {
    // Selectează aleatoriu o categorie
    const categoryKeys = Object.keys(categories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    setSelectedCategory(randomCategory);
    const object = getRandomObject(randomCategory);
    setSelectedObject(object);
    // Aici ar trebui să pui logica pentru a obține imaginea asociată
    setImage(`path_to_image/${object}.jpg`); // Exemplu de imagine
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Învăță să scrii cuvântul:</Text>
      
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      
      <Text style={styles.objectName}>{selectedObject}</Text>
      
      <TouchableOpacity style={styles.drawingBox}>
        <Text style={styles.drawingText}>Desenează cuvântul cu degetul aici!</Text>
        {/* Aici poți adăuga un component de desen */}
      </TouchableOpacity>
    </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  objectName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawingBox: {
    width: '100%',
    height: 200,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawingText: {
    fontSize: 18,
    color: '#888',
  },
});

export default Game;
