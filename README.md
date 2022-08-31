# react-native-applica-signature

React Native Signature Component based Canvas for Android &amp;&amp; IOS &amp;&amp; expo

- Supports Android and iOS with Expo SDK v.45.0.0
- Tested with React Native 0.68.2
- Generates a base64 encoded png image of the signature

## Installation(for React Native from V0.60.2 or Expo SDK from v35.0.0)

```bash
npm install react-native-applica-signature
```

## Usage
Basic
```js
import SignCanvas from "react-native-applica-signature";
```

## Properties

---

| Prop                                |    Type    | Description                                                                                                                                           |
| :---------------------------------- | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| androidHardwareAccelerationDisabled | `boolean`  | androidHardwareAccelerationDisabled for react-native-webview. Default is false                                                                        |
| autoClear                           | `boolean`  | should auto clear the signature after clicking the Confirm button                                                                                     |
| backgroundColor                     |  `string`  | default is "rgba(255,255,255,0)" (_transparent_), background color of the canvas                                                                                           |
| bgHeight                            |  `number`  | height of the background image                                                                                                                        |
| bgWidth                             |  `number`  | width of the background image                                                                                                                         |
| bgSrc                               |  `string`  | background image source uri (_url_)                                                                                                                  |
| clearText                           |  `string`  | clear button text                                                                                                                                     |
| confirmText                         |  `string`  | save button text                                                                                                                                      |
| customHtml                          | `(injectedJavaScript: string) => string` | html string that lets you modify things like the layout or elements                                                                                   |
| dataURL                             |  `string`  | default is "", Base64 string, draws saved signature from dataURL.                                                                                     |
| descriptionText                     |  `string`  | description text for signature                                                                                                                        |
| dotSize                             |  `number`  | radius of a single dot _(not stroke width)_                                                                                                           |
| imageType                           |  `string`  | "image/png" (_default_), "image/jpeg"、"image/svg+xml", imageType of exported signature                                                               |
| minWidth                            |  `number`  | minimum width of a line. Defaults to 0.5                                                                                                              |
| maxWidth                            |  `number`  | maximum width of a line. Defaults to 2.5                                                                                                              |
| onOK                                | `function` | callback function after saving non-empty signature                                                                                                    |
| onEmpty                             | `function` | callback function after trying to save an empty signature                                                                                             |
| onClear                             | `function` | callback function after clearing the signature                                                                                                        |
|onGetData|`function`|callback function when getData() is called
| onBegin                             | `function` | callback function when a new stroke is started                                                                                                        |
| onEnd                               | `function` | callback function when the stroke has ended                                                                                                           |
| onUndo                              | `function` | callback function when undo() is called |
| onRedo                              | `function` | callback function when redo() is called |
| onDraw                              | `function` | callback function when drawing is enabled                                                                                                             |
| onErase                             | `function` | callback function when erasing is enabled                                                                                                             |
| onChangePenColor                    | `function` | callback function after changing the pen color |
| onChangePenSize | `function` | callback function after changing the pen size
|overlayHeight|`number`|height of the overlay image|
|overlayWidth|`number`|width of the overlay image|
|overlaySrc|`string`|overlay image source uri (url) _must be .png with a transparent background_
| penColor                            |  `string`  | default is "black", color of pen                                                                                                                      |
| rotated                             | `boolean`  | rotate signature pad 90 degrees                                                                                                                       |
| style                               |  `object`  | style of wrapper view                                                                                                                                 |
| trimWhitespace                      | `boolean`  | trim image whitespace                                                                                                                                 |
| webStyle                            |  `string`  | webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css |


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

To call the methods use the `useRef` hook:

'''js
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
'''

## Example

'''js
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
'''

