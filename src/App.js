import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import RegisterUser from './components/RegisterUser/RegisterUser';
import SignIn from './components/SignIn/SignIn';
import Particles from 'react-particles-js';

import './App.css';

// Particle configuration for the background
const particleOptions = {
    particles: {
        polygon: {
          nb_sides: 5
        },
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 400
          }
        }
      }
}

// Declaring and assigning the initial state of the app
const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  userIsSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};


class App extends Component {
  constructor() {
    super();
    // Assigning the app's state to the initial state declared above
    this.state = initialState;
  }

  /**
  * @description Changes the state of the user object with properties fetched from the data object
  * @param {object} data - database object
  */
  loadUser = data => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  /**
  * @description Changes state of the userIsSignedIn property or resets all on route change
  * @param 'String' route
  */
  onRouteChange = route => {
    route === 'signout' ? this.setState(initialState)
    : route === 'home' ? this.setState({userIsSignedIn: true})
    : console.log('undefined route');
    this.setState({route: route});
  }

  /**
  * @description Calculates bounding points of the face in the image using data received from the API and returns them
  * @param {object} data
  */
  workOutFacePosition = data => {
    const image = document.getElementById('input-image');
    const faceInImage = data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    return {
      leftCol: faceInImage.left_col * imageWidth,
      topRow: faceInImage.top_row * imageHeight,
      rightCol: imageWidth - (faceInImage.right_col * imageWidth),
      bottomRow: imageHeight - (faceInImage.bottom_row * imageHeight)
    }
  }

  displayFaceBoundingBox = box => {
    this.setState({box: box});
  }

  onInputChange = event => {
    this.setState({input: event.target.value})
  }

  /**
  * @description Handles asynchronous fetches to the backend when the user submits an image
  */
  onImageSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('https://peaceful-stream-83121.herokuapp.com/imageURL', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({input: this.state.input})
    })
    .then(response => response.json())
    .then(response => {
      // Checks if there's a response to the initial fetch and then sends the image to be handled by the backend
      if (response) {
        fetch('https://peaceful-stream-83121.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: this.state.user.id})
        })
        .then(response => response.json())
        .then(count => {
          // Increasing the number of entry submissions by the user
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log);
      }
      // Displaying the bounding box on the face in the image using the returned values from the callback function
      this.displayFaceBoundingBox(this.workOutFacePosition(response))
    })
    .catch(err => console.log(err));
  }

  render() {
    // Destructuring the properties in the state object
    const { imageURL, box, route, userIsSignedIn} = this.state;

    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation userIsSignedIn={userIsSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />
              <FaceRecognition box={box} imageURL={imageURL}/>
            </div>
          : route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <RegisterUser loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
