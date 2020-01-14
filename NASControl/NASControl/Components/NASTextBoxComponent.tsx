import * as React from "react";
import { TextField, MaskedTextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

export interface INasTextFieldProps {
    value?:string;
    valueChanged:(val:string,isvalid:boolean) => void;
    lang?:string;
    isRequired?:boolean;
    isEditable?:boolean;
    isReadable?:boolean;
}

export interface INasTextFieldState extends React.ComponentState, INasTextFieldProps {
    isValid:boolean;
    errorMessage:string;
}

export class NASTextField extends React.Component<INasTextFieldProps, INasTextFieldState> {
    constructor(props:INasTextFieldProps){
        super(props);
        let newValue = this.props.value;
        this.state = {
            value: ( !newValue || this.clearMask(newValue).length <= 9) ? newValue || '' : this.state.value,
            isValid: this.validate(this.props.value),
            valueChanged: this.props.valueChanged,
            lang : !this.props.lang || (this.props.lang != "fr" && this.props.lang != "en") ? "en" : "fr",
            errorMessage:!this.validate(this.props.value) ? this.getErrorMessage() : "",
            isEditable:this.props.isEditable,
            isRequired:this.props.isRequired,
            isReadable:this.props.isReadable

        }
    }
    private getErrorMessage():string{
        switch(this.props.lang){
            case "fr":
                return this.error_message_fr;
            case "en":
            default:
                return this.error_message_en;
        }
        
    }
    public componentWillReceiveProps(newProps: INasTextFieldProps): void {
        this.setState(newProps);
    }
    private error_message_en:string = "Invalid SIN";
    private error_message_fr:string = "NAS Invalide";
    public render():JSX.Element {
        const maskedtestfieldprops: ITextFieldProps = {
            value: this.state.isReadable === true ?this.state.value:"--------",
            mask:"999-999-999",
            onChange:this._onChange,
            errorMessage:this.state.errorMessage,
           // required: this.state.isRequired,
            readOnly: this.state.isEditable === false
            
        }
       if(this.state.isReadable === false)
       {
            maskedtestfieldprops.errorMessage = "";
            maskedtestfieldprops.type = 'password';
            maskedtestfieldprops.mask = undefined;
            return(<TextField {...maskedtestfieldprops}  />);
       }else{
           if(maskedtestfieldprops.readOnly === true)
            {
                maskedtestfieldprops.errorMessage = "";
            }
        return(<MaskedTextField {...maskedtestfieldprops}  />);
       }
    };

    private _onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void =>{
        let v = ( !newValue || this.clearMask(newValue).length <= 9) ? (newValue || '') : this.state.value;
        let s:INasTextFieldState = {
            isValid: this.validate(v),
            valueChanged: this.state.valueChanged,
            value : v,
            lang: this.state.lang,
            errorMessage:!this.validate(v) ?this.getErrorMessage():""
        }
        this.setState(s);
        this.state.valueChanged(this.clearMask(v || ''),s.isValid);

    }
    private clearMask(v:string):string{
        return v.replace(/[\-\_]/gm,'');
    }
    private validate(v?:string):boolean{

        if(!v || v == "")
            return true;
        v = this.clearMask(v);
        let check, even, tot;

        let sin:any = !v ? "" : v;
      
        if (sin.length === 9) {
          // convert to an array & pop off the check digit
          sin = sin.split('');
          check = +sin.pop();
      
          even = sin
            // take the digits at the even indices
            .filter((_:any, i:any) => { return i % 2; })
            // multiply them by two
            .map(function (n:any) { return n * 2; })
            // and split them into individual digits
            .join('').split('');
      
          tot = sin
            // take the digits at the odd indices
            .filter(function (_:any, i:any) { return !(i % 2); })
            // concatenate them with the transformed numbers above
            .concat(even)
            // it's currently an array of strings; we want numbers
            .map(function (n:any) { return +n; })
            // and take the sum
            .reduce(function (acc:any, cur:any) { return acc + cur; });
      
          // compare the result against the check digit
          return check === (10 - (tot % 10)) % 10;
        } else return false;

       
    }

}