import React, {useEffect, useRef, useState} from 'react';
import {SWATCHES} from '../constants';
import { Button, Group, ColorSwatch} from '@mantine/core';
import Draggable from 'react-draggable';
import { View, StyleSheet, PanResponder, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default function CanvasInput() {
    const [paths, setPaths] = useState([]); // Stochează traseele desenate
    const [currentPath, setCurrentPath] = useState(''); // Traseul curent


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          setCurrentPath(`M${locationX},${locationY}`);
        },
        onPanResponderMove: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          setCurrentPath((prevPath) => `${prevPath} L${locationX},${locationY}`);
        },
        onPanResponderRelease: () => {
          setPaths((prevPaths) => [...prevPaths, currentPath]);
          setCurrentPath(''); // Resetare traseu curent
        },
      });
    
      const clearCanvas = () => {
        setPaths([]);
        setCurrentPath('');
      };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };  
    return (
        <View style={styles.container}>
          <Svg style={styles.canvas} {...panResponder.panHandlers}>
            {/* Desenează traseele finalizate */}
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke="black"
                strokeWidth={2}
                fill="none"
              />
            ))}
            {/* Desenează traseul curent */}
            {currentPath !== '' && (
              <Path d={currentPath} stroke="black" strokeWidth={2} fill="none" />
            )}
          </Svg>
          <Button title="Clear" onPress={clearCanvas} />
        </View>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        },
        canvas: {
          width: '100%',
          height: 400,
          backgroundColor: '#f0f0f0',
          borderWidth: 1,
          borderColor: '#ccc',
        },
      });
      
