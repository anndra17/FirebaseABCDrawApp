import React, { useState, useEffect, useRef } from 'react';
import { categories } from '../data/categoryImages';
import Svg, { Path } from 'react-native-svg';
import { View, SafeAreaView, ImageBackground, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const backgroundImage = require('../../assets/images/appBackground.jpg');

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { width, height } = useWindowDimensions();
  const [paths, setPaths] = useState([]); // Traseele desenate
  const [currentPath, setCurrentPath] = useState(''); // Traseul curent
  const [selectedObject, setSelectedObject] = useState(null);
  const [isErasing, setIsErasing] = useState(false); // State for erasing mode

  // Referință pentru a detecta mișcările
  const startX = useRef(0);
  const startY = useRef(0);

  // Funcție care selectează un obiect aleatoriu dintr-o categorie
  const getRandomObject = (category) => {
    const objects = categories[category];
    const randomIndex = Math.floor(Math.random() * objects.length);
    return objects[randomIndex];
  };

  const handleTouchStart = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    startX.current = locationX;
    startY.current = locationY;
    setCurrentPath(`M${locationX},${locationY}`);
  };

  const handleTouchMove = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    if (locationY >= 0 && locationY <= 200 && locationX >= 0 && locationX <= width - 40) { // Ensure drawing stays within the width and height of the drawing box
      setCurrentPath((prev) => `${prev} L${locationX},${locationY}`);
    }
  };

  const handleTouchEnd = () => {
    setPaths((prevPaths) => [...prevPaths, { path: currentPath, isErasing }]);
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

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {selectedCategory ? (
          // Dacă o categorie este selectată, afișează conținutul asociat
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
              <TouchableOpacity onPress={handleBackToCategories} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="white" /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={handleResetWord} style={styles.resetButton}>
                <Icon name="refresh" size={24} color="white" /> 
              </TouchableOpacity>

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
                  {paths.map((pathObj, index) => (
                    <Path
                      key={index}
                      d={pathObj.path}
                      stroke={pathObj.isErasing ? "#f0f0f0" : "black"} // Use the same color as the drawing box background
                      strokeWidth={pathObj.isErasing ? 10 : 2} // Thicker stroke for erasing
                      fill="none"
                    />
                  ))}
                  {/* Traseul curent */}
                  {currentPath !== '' && (
                    <Path
                      d={currentPath}
                      stroke={isErasing ? "#f0f0f0" : "black"} // Use the same color as the drawing box background
                      strokeWidth={isErasing ? 10 : 2} // Thicker stroke for erasing
                      fill="none"
                    />
                  )}
                </Svg>
              </SafeAreaView>

              {/* Butoane pentru curățare și guma de șters */}
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
                  <Icon name="clear" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleEraser} style={styles.eraserButton}>
                  <Icon name={isErasing ? "brush" : "delete"} size={24} color="white" /> 
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#4caf59', 
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
    right: 60,
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff5757',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eraserButton: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
  drawingBox: {
    width: '100%',
    height: 200, // Ensure this matches the height used in the handleTouchMove check
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  objectName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});