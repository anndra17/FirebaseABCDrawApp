import {View, Text} from 'react-native';
import {Link} from 'expo-router';

export default function Home() {
    return <View>
        <Text>Home Page</Text>
        <Link href='/game'>Go to game page</Link>
    </View>
}