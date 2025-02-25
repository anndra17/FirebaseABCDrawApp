import React, { useState, useEffect, useRef } from 'react';
import { categories } from '../data/categoryImages';
import Svg, { Path } from 'react-native-svg';
import { View, SafeAreaView, ImageBackground, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const backgroundImage = require('../../assets/images/appBackground.jpg');

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { width, height } = useWindowDimensions();
  const [paths, setPaths] = useState([]); // Traseele desenate
  const [currentPath, setCurrentPath] = useState(''); // Traseul curent
  const [selectedObject, setSelectedObject] = useState(null);

  // Referință pentru a detecta mișcările
  const startX = useRef(0);
  const startY = useRef(0);

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
  }, []);

  const handleTouchStart = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    startX.current = locationX;
    startY.current = locationY;
    setCurrentPath(`M${locationX},${locationY}`);
  };

  const handleTouchMove = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setCurrentPath((prev) => `${prev} L${locationX},${locationY}`);
  };

  const handleTouchEnd = () => {
    setPaths((prevPaths) => [...prevPaths, currentPath]);
    setCurrentPath('');
  };

  const clearCanvas = () => {
    setPaths([]);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const object = getRandomObject(category);
    setSelectedObject(object);
  };

  const handleBackToCategories = () => {
    clearCanvas(); // Clear the canvas when going back to categories
    setSelectedCategory(null); // Resetează selecția la null pentru a reveni la lista de categorii
  };

  const handleResetWord = () => {
    if (selectedCategory) {
      const object = getRandomObject(selectedCategory);
      setSelectedObject(object);
      clearCanvas(); // Clear the canvas when resetting the word
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {selectedCategory ? (
          // Dacă o categorie este selectată, afișează conținutul asociat
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
              <TouchableOpacity onPress={handleBackToCategories} style={styles.backButton}>
                <Text style={styles.backButtonText}>Înapoi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleResetWord} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Resetează cuvântul</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Învăță să scrii cuvântul:</Text>

              {selectedObject && (
                <>
                  <Image source={selectedObject.imagine} style={styles.image} />
                  <Text style={styles.objectName}>{selectedObject.nume.toUpperCase()}</Text>
                </>
              )}

              {/* Canvas pentru desen */}
              <SafeAreaView style={styles.drawingBox}>
                <Svg
                  style={{ width: width - 40, height: 200 }}
                  onStartShouldSetResponder={() => true}
                  onResponderGrant={handleTouchStart}
                  onResponderMove={handleTouchMove}
                  onResponderRelease={handleTouchEnd}
                >
                  {/* Desenează toate traseele existente */}
                  {paths.map((path, index) => (
                    <Path key={index} d={path} stroke="black" strokeWidth={2} fill="none" />
                  ))}
                  {/* Traseul curent */}
                  {currentPath !== '' && <Path d={currentPath} stroke="black" strokeWidth={2} fill="none" />}
                </Svg>
              </SafeAreaView>

              {/* Buton pentru curățare */}
              <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Șterge</Text>
              </TouchableOpacity>
            </View>
          </GestureHandlerRootView>
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
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    backgroundColor: 'green', // O culoare pentru butonul de înapoi
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    backgroundColor: '#4caf50', // O culoare pentru butonul de resetare
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawingBox: {
    width: '100%',
    height: 140,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: '#ff5757',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  objectName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});