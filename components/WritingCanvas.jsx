// WritingCanvas.jsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WritingCanvas({ width, height, onPathsChange }) {
  const [paths, setPaths] = useState([]); // Traseele desenate
  const [currentPath, setCurrentPath] = useState(''); // Traseul curent

  // Referință pentru a detecta mișcările
  const startX = useRef(0);
  const startY = useRef(0);

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
    setPaths((prevPaths) => {
      const updatedPaths = [...prevPaths, currentPath];
      onPathsChange(updatedPaths); // Returnează căile desenate la componenta părinte
      return updatedPaths;
    });
    setCurrentPath('');
  };

  const clearCanvas = () => {
    setPaths([]);
    onPathsChange([]); // Resetează căile la componenta părinte
  };

  return (
    <View style={styles.container}>
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
            </SafeAreaView></View>
  );
}

const styles = StyleSheet.create({
    drawingBox: {
        width: '100%',
        height: 200,
        borderColor: '#bcbcbc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
    clearButton: {
      backgroundColor: '#ff5757',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    clearButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  