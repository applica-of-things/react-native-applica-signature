# react-native-applica-signature

React Native Signature Component based Canvas for Android, iOS and Expo

- Supports Android and iOS with Expo SDK v.46.0.0
- Tested with React Native 0.69.5
- Generates a base64 encoded png image of the signature
- Based on [react-native-canvas-for-sign]

## Installation(for React Native from V0.60.0 or Expo SDK from v35.0.0)

```bash
npm install react-native-applica-signature
```

## Usage
```js
import SignCanvas from "react-native-canvas-for-sign";
```

## Properties

---

| Prop                                |    Type    | Description                                                                                                                                           |
| :---------------------------------- | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoClear                           | `boolean`  | should auto clear the signature after clicking the Confirm button
| penColor                            |  `string`  | default is "black", color of 
| onConfirm                           | `function`  | callback function when confirm button has pressed
| onEmptyConfirm                      | `function`  | callback function when clear button has pressed 

## Methods

---

| Function                  | Description                                                                                     |
| :--------------------     | :-----------------------------------------------------------------------------------------------|
| clearSignature()          | Clear the current signature                                                                     |
| changePenColor(color)     | Change pen color                                                                                |
| changePenSize(minW, maxW) | Change pen size                                                                                 |
| draw()                    | Enable drawing signature                                                                        |
| erase()                   | Enable erasing signature                                                                        |
| getData()                 | Triggers the `onGetData` callback with a single `data` JSON string                              |
| readSignature()           | Reads the current signature on the canvas and triggers either the `onOK` or `onEmpty` callbacks |
| undo()                    | Undo last stroke                                                                                |
| redo()                    | Redo last stroke                                                                                |

```js
const SignCanvas = forwardRef(({ onConfirm, onEmptyConfirm, autoclear = true, penColor = 'blue' }, ref) => {
    const style = `
        body,html {
            width: 100%; 
            height: 100%;
        }
        .m-signature-pad {
            flex: 1;
            border: none;
            box-shadow: none;
            margin: 0px;
          }
        .m-signature-pad--footer{
            display: none;
        } 
        `
    const handleSignature = (signature) => {
        if (_.isFunction(onConfirm)){
            onConfirm(signature);
        }
    };

    const handleEmpty = () => {
        if (_.isFunction(onEmptyConfirm)){
            onEmptyConfirm();
        }
    };

    return (
        <SignatureScreen
            ref = {ref}
            onOK = {handleSignature}
            onEmpty = {handleEmpty}
            penColor = {penColor}
            autoClear = {autoclear}
            webStyle={style}
            backgroundColor = 'white'
        />
    );
})

export default SignCanvas;
```

## Example

```js
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SignCanvas from 'react-native-applica-signature';

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
```
