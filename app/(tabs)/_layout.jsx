import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'green' }}>
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Învățăm să scriem!',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="create" color={color} size={size} /> // Icon for home tab
                    ),
                }} 
            />
            <Tabs.Screen 
                name="StickerSmash"
                options={{
                    title: 'StickerSmash',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="emoji-emotions" color={color} size={size} /> // Icon for StickerSmash tab
                    ),
                }} 
            />
            <Tabs.Screen 
                name="settings"
                options={{
                    title: 'Setări',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="settings" color={color} size={size} /> // Icon for settings tab
                    ),
                }} 
            />
        </Tabs>
    );
}