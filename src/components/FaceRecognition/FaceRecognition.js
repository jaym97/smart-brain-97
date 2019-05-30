import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='cntr ma'>
            <div className='absolute mt1'>
                <img id='input-image' src={imageURL} alt='' width='500px' height='auto' />
                <div className='bounding-box'
                     style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;