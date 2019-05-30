import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='f2 text'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='em f1'>
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;