import React, { Component } from 'react';
import FormField from './FormField';
import zxcvbn from 'zxcvbn';


class PasswordField extends Component {

    constructor(props) {
        super(props);
        this.state={
            strength:0,
            passwordLength:0
        }
        this.handlePasswordChange= this.handlePasswordChange.bind(this);
		const { minStrength = 3, thresholdLength = 7 } = props;

		this.minStrength = typeof minStrength === 'number'
			? Math.max( Math.min(minStrength, 4), 0 )
			: 3;

		this.thresholdLength = typeof thresholdLength === 'number'
			? Math.max(thresholdLength, 7)
            : 7;
          
    }
    handlePasswordChange(e,vstate){
     //   console.log(e);
        this.setState({
            strength: zxcvbn(e.target.value).score,
            passwordLength:e.target.value.length
        });
        this.props.handlechange(e,vstate);
    }
    validatePasswordStrong = event => {
		if (event.target.value.length <= this.thresholdLength) return false;
        if (zxcvbn(event.target.value).score < this.minStrength) return false;
        return true;
	};
    render() {
        const strengthClass = ['strength-meter mt-2', this.state.passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();
      
        return (
            <div>
            
            <FormField
            type="password" 
            controlid="password"
            validationstate={this.props.validationstate}
            name="Password"
            value={this.props.value} 
            validate={this.validatePasswordStrong}
            handlechange={this.handlePasswordChange} 
            required={true} 
            placeholder={"password"} 
            helptext={"Password is mandatory, To conform with our Strong Password policy, you are required to use a sufficiently strong password. Password must be more than 7 characters."} 
            autoFocus
            >
            {this.Children}
           
            </FormField>
            <div className={strengthClass}>
            <div className="strength-meter-fill" data-strength={this.state.strength}></div>
        </div>
        </div>
        );
    }
}

export default PasswordField;
