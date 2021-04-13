import { Component } from "react";
import './styles.css'
export default class Button extends Component{
    render(){
        const {text, onClick, disabled} = this.props
        return(
            <div className = 'button-container'>
                <button 
                    disabled = {disabled}
                    className = 'button' 
                    onClick = {onClick}>
                    {text}
                </button>
            </div>
        )
    }
}