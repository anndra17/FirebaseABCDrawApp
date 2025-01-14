import { StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function ImageViewer({ imgSource, selectedImage, style }) {
    const imageSource = selectedImage 
        ? { uri: selectedImage } 
        : imgSource; 

    return <Image source={imageSource} style={style? style :styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
