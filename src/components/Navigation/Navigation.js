import React from 'react';

const Navigation = ({onRouteChange, userIsSignedIn}) => {
    if (userIsSignedIn) {
        return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 dim link white underline pa3 pointer'>logout</p>
                </nav>)
    } else {
        return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 dim link white underline pa3 pointer'>sign in</p>
                    <p onClick={() => onRouteChange('register')} className='f3 dim link white underline pa3 pointer'>register</p>
                </nav>)
    }
}

export default Navigation;