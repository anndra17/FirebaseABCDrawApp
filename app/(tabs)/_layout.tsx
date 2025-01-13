import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>            
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Home'
            }} />
            <Tabs.Screen 
                name="StickerSmash"
                options={{
                    title: 'StickerSmash'
            }} />
            <Tabs.Screen 
                name="settings"
                options={{
                    title: 'Settings'
            }} />
            
            
        </Tabs>
    );
}