import React, {Component} from 'react';
import './SignIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            signInCard: {},
            errMsg: {}
        }
    }

    /**
    * @description Updates the state of the signInEmail with user-entered text
    * @param {object} event - keystroke event
    */
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    /**
    * @description Updates the state of the signInPassword with user-entered text
    * @param {object} event - keystroke event
    */
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    /**
    * @description Posts a request with the signin info entered by the user to the server
    */
    onSignIn = () => {
        fetch('https://peaceful-stream-83121.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        // Checks if the fields have information entered correctly and handles them accordingly
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else {
                this.setState({
                    signInCard: document.getElementById('signInCard'),
                    errMsg: document.getElementById('err-msg')
                });
                this.state.signInCard.classList.add('wrongInfoAnimation');
                this.state.errMsg.classList.toggle('invisible');
                this.state.errMsg.classList.toggle('visible');
                // Removes the animation class just after the animation is completed so it can be added again
                setTimeout(() => this.state.signInCard.classList.remove('wrongInfoAnimation'), 1300);
            }
        })
    }

    render() {
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" id="signInCard">
                    <main className="pa4 black-80">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <label className="fw6 lh-copy f6 invisible" id="err-msg">You have not entered a username and/or password</label>
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
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
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
                                    value="Sign in"
                                    onClick={this.onSignIn}
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => this.props.onRouteChange('register')} className="f5 link dim black db pointer">Create an account</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;
