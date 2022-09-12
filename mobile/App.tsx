import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!!</Text>
      <Button title='send 1' />
      <Button title='send 2' />
      <Button title='send 3' />

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
