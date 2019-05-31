import React, {Component} from 'react';
import './RegisterUser.css';

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            registerCard: {},
            errMsg: {}
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    /**
    * @description Posts a request with registration info to the server
    */
    onRegister = () => {
        fetch('https://peaceful-stream-83121.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                if (!this.state.email.includes('@') || !this.state.email.includes('.com') || this.state.password.length < 6){
                    this.setState({
                        registerCard: document.getElementById('register-card'),
                        errMsg: document.getElementById('err-msg')
                    });
                    debugger
                    this.state.errMsg.textContent = 'You have entered an invalid email format and/or wrong password length';
                    this.state.errMsg.classList.remove('invisible');
                    this.state.errMsg.classList.add('visible');
                    this.state.registerCard.classList.add('wrongInfoAnimation');
                    // Removes the animation class just after the animation is completed so it can be added again
                    setTimeout(() => this.state.registerCard.classList.remove('wrongInfoAnimation'), 1300);
                } else {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }

            } else if (!this.state.email || !this.state.password || !this.state.name){
                this.setState({
                    registerCard: document.getElementById('register-card'),
                    errMsg: document.getElementById('err-msg')
                });
                this.state.errMsg.classList.remove('invisible');
                this.state.errMsg.classList.add('visible');
                this.state.registerCard.classList.add('wrongInfoAnimation');
                // Removes the animation class just after the animation is completed so it can be added again
                setTimeout(() => this.state.registerCard.classList.remove('wrongInfoAnimation'), 1300);
            }
        })
    }

    render() {
        return(
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" id="register-card">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Create an Account</legend>
                                <label className="fw6 lh-copy f6 invisible" id="err-msg">Please fill out all fields</label>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password (should be at least 6 characters long)</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div>
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent hover-bg-yellow grow pointer f6 dib"
                                    type="submit"
                                    value="register"
                                    onClick={this.onRegister}
                                />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default RegisterUser;
