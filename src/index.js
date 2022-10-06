import SignatureScreen from 'react-native-canvas-for-sign';
import { forwardRef } from 'react';
import * as _ from 'underscore';

const SignCanvas = forwardRef(({ onConfirm, onEnd, onEmptyConfirm, autoclear = true, penColor = 'blue', backgroundColor='white' }, ref) => {
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
    const handleEnd = () => {
        if (_.isFunction(onEnd)){
            onEnd();
        }
    };

    return (
        <SignatureScreen
            ref = {ref}
            onOK = {handleSignature}
            onEnd = {handleEnd}
            onEmpty = {handleEmpty}
            penColor = {penColor}
            autoClear = {autoclear}
            webStyle={style}
            backgroundColor = {backgroundColor}
        />
    );
})

export default SignCanvas;
