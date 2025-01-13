import React, { useState, useEffect, useRef } from 'react';
import { Button,View,SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { categories } from './data/categories'; // importă fișierul cu categoriile
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // importă GestureHandlerRootView
import Svg, { Path } from 'react-native-svg';


export default function Game() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedObject, setSelectedObject] = useState('');
  const [image, setImage] = useState('');
  const {width, height} = useWindowDimensions();
  const [paths, setPaths] = useState([]); // Traseele desenate
  const [currentPath, setCurrentPath] = useState(''); // Traseul curent
  

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
    // Aici ar trebui să pui logica pentru a obține imaginea asociată
    setImage(`path_to_image/${object}.jpg`); // Exemplu de imagine
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

  const saveCanvasImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const image = canvas.toDataURL("image/png");
        
        // Creează un link pentru descărcare
        const link = document.createElement("a");
        link.href = image;
        link.download = "drawing.png";
        link.click();

        console.log("Image saved:", image); // Pentru a trimite imaginea la model
    }
};



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Învăță să scrii cuvântul:</Text>

        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.objectName}>{selectedObject}</Text>

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
              <Path
                key={index}
                d={path}
                stroke="black"
                strokeWidth={2}
                fill="none"
              />
            ))}
            {/* Traseul curent */}
            {currentPath !== '' && (
              <Path d={currentPath} stroke="black" strokeWidth={2} fill="none" />
            )}
          </Svg>
        </SafeAreaView>

        {/* Buton pentru curățare */}
        <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Șterge</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={saveCanvasImage} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Verifica</Text>
        </TouchableOpacity>


      </View>
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
});
