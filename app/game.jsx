// import React, { useState, useEffect, useRef } from 'react';
// import { Button,View,SafeAreaView,ImageBackground, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
// import { categories } from './data/categories'; // importă fișierul cu categoriile
// import { ScrollView } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler'; // importă GestureHandlerRootView
// import Svg, { Path } from 'react-native-svg';
// import { useLocalSearchParams } from 'expo-router';
// import { pipeline } from '@xenova/transformers';


// const backgroundImage = require('../assets/images/appBackground.jpg')

// export default function Game() {
//   const { category } = useLocalSearchParams(); // Categoria primită din Home
//   const [selectedObject, setSelectedObject] = useState('');
//   const [image, setImage] = useState('');
//   const {width, height} = useWindowDimensions();
//   const [paths, setPaths] = useState([]); // Traseele desenate
//   const [currentPath, setCurrentPath] = useState(''); // Traseul curent
  

//   // Referință pentru a detecta mișcările
//   const startX = useRef(0);
//   const startY = useRef(0);

//   useEffect(() => {
//     if (category && categories[category]?.length > 0) {
//       const objects = categories[category];
//       const randomIndex = Math.floor(Math.random() * objects.length);
//       const object = objects[randomIndex];
//       setSelectedObject(object);
//       // setImage(object.imagine);
//     } else {
//       setSelectedObject(null);
//     }
//   }, [category]);
  

//   const handleTouchStart = (e) => {
//     const { locationX, locationY } = e.nativeEvent;
//     startX.current = locationX;
//     startY.current = locationY;
//     setCurrentPath(`M${locationX},${locationY}`);
//   };

//   const handleTouchMove = (e) => {
//     const { locationX, locationY } = e.nativeEvent;
//     setCurrentPath((prev) => `${prev} L${locationX},${locationY}`);
//   };

//   const handleTouchEnd = () => {
//     setPaths((prevPaths) => [...prevPaths, currentPath]);
//     setCurrentPath('');
//   };

//   const clearCanvas = () => {
//     setPaths([]);
//   };


//   const saveCanvasImage = async () => {
//     const canvasImage = await generateImageFromSvg(); // Aici ai nevoie de o metodă pentru a genera imaginea din traseele SVG
//     if (canvasImage) {
//       // Urcă imaginea pe pipeline-ul OCR
//       const captioner = await pipeline('image-to-text', 'Xenova/trocr-small-handwritten');
//       try {
//         // Execută OCR pe imagine
//         const output = await captioner(canvasImage);
//         const generatedText = output[0].generated_text.trim().toLowerCase(); // Textul generat de model
  
//         // Compară textul obținut cu obiectul selectat
//         if (generatedText === selectedObject.nume.toLowerCase()) {
//           alert('Corect!');
//         } else {
//           alert('Încercați din nou!');
//         }
//       } catch (error) {
//         console.error('Error in OCR request:', error);
//       }
//     }
//   };
  


// if (!category) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Eroare: Categoria nu a fost selectată!</Text>
//       </View>
//     );
//   }


//   return (
//     <ImageBackground source={backgroundImage} style={styles.background}>
 
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Învăță să scrii cuvântul:</Text>

//         {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
//         <Text style={styles.objectName}>{selectedObject.nume?.toUpperCase()}</Text>

//         {/* Canvas pentru desen */}
//         <SafeAreaView style={styles.drawingBox}>
//           <Svg
//             style={{ width: width - 40, height: 200 }}
//             onStartShouldSetResponder={() => true}
//             onResponderGrant={handleTouchStart}
//             onResponderMove={handleTouchMove}
//             onResponderRelease={handleTouchEnd}
//           >
//             {/* Desenează toate traseele existente */}
//             {paths.map((path, index) => (
//               <Path
//                 key={index}
//                 d={path}
//                 stroke="black"
//                 strokeWidth={2}
//                 fill="none"
//               />
//             ))}
//             {/* Traseul curent */}
//             {currentPath !== '' && (
//               <Path d={currentPath} stroke="black" strokeWidth={2} fill="none" />
//             )}
//           </Svg>
//         </SafeAreaView>

//         {/* Buton pentru curățare */}
//         <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
//           <Text style={styles.clearButtonText}>Șterge</Text>
//         </TouchableOpacity>
        
//          <TouchableOpacity onPress={saveCanvasImage} style={styles.clearButton}>
//           <Text style={styles.clearButtonText}>Salveaza imaginea</Text>
//         </TouchableOpacity> 


//       </View>
//     </GestureHandlerRootView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   background: {
//     flex: 1,
//     resizeMode: 'cover', // Asigură afișarea completă
//     justifyContent: 'center',
//   },
//   image: {
//     width: '50%', // 50% din lățimea ecranului
//     height:'25%', // 25% din înălțimea ecranului
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   objectName: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   drawingBox: {
//     width: '100%',
//     height: 200,
//     borderColor: '#bcbcbc',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: '#f0f0f0',
//     marginBottom: 20,
//   },
//   clearButton: {
//     backgroundColor: '#ff5757',
//     padding: 10,
//     borderRadius: 5,
//   },
//   clearButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
