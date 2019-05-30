import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onImageSubmit}) => {
    return (
        <div>
            <p className='f3 white'>{'This Magic Brain will detect faces in your photos. Give it a try.'}</p>
            <div className='cntr'>
                <div className='form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib btn' onClick={onImageSubmit}>detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;
