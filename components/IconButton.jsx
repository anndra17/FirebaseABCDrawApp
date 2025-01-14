import { StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function IconButton({ onPress, icon, label }) {
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={25} color="black"  />
            {label && <Text style={styles.iconButtonLabel}>{label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: 'black',
        marginTop: 12,
    },
});
