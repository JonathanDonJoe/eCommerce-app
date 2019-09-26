import React from 'react';
import BaseCard from './BaseCard';
import Slick from './Slick';

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
            <Slick elements={baseCards} />
        </div>
    );
}
 
export default Venue;