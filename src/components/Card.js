import React from 'react';

export const Card = (props) => {
    const props1 = props;
    const prpd = props.data;
    return (
        <div className='card'>
            <div className='card-image'><img src={props?.data?.image}/></div>
            <div className='card-description'></div>
            <div className='card-footer'></div>
        </div>
    )
}