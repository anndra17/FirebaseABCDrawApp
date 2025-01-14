import React, { useEffect, useState, useRef } from 'react';


import { View,Text, StyleSheet, Platform,TouchableOpacity, ImageBackground  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageSource } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import EmojiPicker from '../../components/EmojiPicker';
import EmojiList from '../../components/EmojiList';
import EmojiSticker from '../../components/EmojiSticker';
import CircleButton from '../../components/CircleButton';

const PlaceholderImage = require('../../assets/images/MainImage.png');
const BackgroundImage = require('../../assets/images/appBackground.jpg');


export default function StickerSmash() {
    const [selectedImage, setSelectedImage] = useState(undefined);
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState(undefined);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const imageRef = useRef(null);
  
    if (status === null) {
      requestPermission();
    }
  
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setShowAppOptions(true);
      } else {
        alert('You did not select any image.');
      }
    };
  
    const onReset = () => {
      setShowAppOptions(false);
    };
  
    const onAddSticker = () => {
      setIsModalVisible(true);
    };
  
    const onModalClose = () => {
      setIsModalVisible(false);
    };
  
    const onSaveImageAsync = async () => {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
  
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <ImageBackground source={BackgroundImage} style={styles.background}>
      <GestureHandlerRootView style={styles.container}>

        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
          <ImageViewer 
              imgSource={selectedImage ? { uri: selectedImage } : PlaceholderImage}
              selectedImage={selectedImage}
            />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <TouchableOpacity onPress={() => setShowAppOptions(true)} style={{marginTop:10}}>
                  <Text>Use this photo</Text>
            </TouchableOpacity>
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </GestureHandlerRootView>
      </ImageBackground>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },
    optionsContainer: {
      position: 'absolute',
      bottom: 80,
    },
    optionsRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
  });