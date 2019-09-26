import React, { Component } from 'react';
import BaseCard from './BaseCard';

function Venue(props) {
     
    const baseCards = props.cities.map( (city, i) => {
        return(
            <div className='col s4' key={i}>
                <BaseCard city={city} /> 
            </div>

        )
})
        
    return (
        <div>
            {baseCards}
        </div>
    );
}
 
export default Venue;