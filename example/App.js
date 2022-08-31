import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SignCanvas from '../src';

export default function App() {
  const ref = useRef(null);

  const handleSignature = signature => {
    console.log(signature);
  };

  const handleEmpty = () => {
    console.log("Empty!");
  };

  const handleClear = () => {
    ref.current?.clearSignature();
    console.log("Cleared signature!");
  };

  const handleConfirm = () => {
      console.log("Confirmed signature!", ref);
      ref.current?.readSignature();
  };

  return (
    <View style={styles.container}>
      <SignCanvas ref={ref} onConfirm={handleSignature} onEmptyConfirm={handleEmpty} /> 
      <View style={styles.footer}>
          <MaterialIcons name="delete" size={32} color='#3884FF' onPress={handleClear}/>
          <MaterialIcons name="check" size={32} color='#3884FF' onPress={handleConfirm}/>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 64,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
    alignItems: 'center',
},
});
