import { StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function ImageViewer({ imgSource, selectedImage, style }) {
    const imageSource = selectedImage ? {uri: selectedImage} : imgSource;
    const selectedStyle = selectedImage ? styles.image : style;


    return <Image source={imageSource} style={selectedStyle} />;
  }
  
  const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    },
  });