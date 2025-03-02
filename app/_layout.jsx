import React from 'react';
import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" /> 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="game" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
}