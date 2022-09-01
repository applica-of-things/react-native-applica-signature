import SignatureScreen from 'react-native-canvas-for-sign';
import { forwardRef } from 'react';
import * as _ from 'underscore';

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