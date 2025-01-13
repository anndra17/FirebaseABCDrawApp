import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Button({label, theme, onPress}) {
    if (theme === 'primary') {
        return (
          <View
            style={[
              styles.buttonContainer,
              { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 28, padding: 3},
            ]}>
            <Pressable
              style={[styles.button, { backgroundColor: '#fff' }]}
              onPress={onPress}>
              <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
              <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
            </Pressable>
          </View>
        );
      }

      if (theme === 'secondary') {
        return (
          <View
            style={[
              styles.buttonContainer,
              { borderWidth: 2, borderColor: '#A22A90', borderRadius: 22 },
            ]}>
            <Pressable
              style={[styles.button, { backgroundColor: '#CA2493'}]}
              onPress={onPress}>
              <Text style={[styles.buttonLabel]}>{label}</Text>
            </Pressable>
          </View>
        );
      }
    
      return (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
      );
    }
const styles = StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 68,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      borderRadius: 20,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
      color: 'white',
      fontSize: 16,
    },
  });