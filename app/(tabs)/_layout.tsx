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
                name="profile"
                options={{
                    title: 'Profile'
            }} />
            <Tabs.Screen 
                name="settings"
                options={{
                    title: 'Settings'
            }} />
            
        </Tabs>
    );
}