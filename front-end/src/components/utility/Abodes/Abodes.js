import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Abodes.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faStar);

class Abodes extends Component {
    render() {
        // const rand = Math.round(Math.random() * 10);
        console.log(this.props.abode)
        const abode = this.props.abode
        console.log(abode.image_url)
        console.log(`${window.apiHost}${abode.image_url}`)
        return (
            <div className="col s12 waypoint">
                <Link to={`/abode/${abode.id}`}>
                    <div className="large-pic">
                        <img src={`${window.apiHost}${abode.image_url}`} alt=''/>
                    </div>
                    <div className="info">
                        <div className="listing-details">{abode.details}</div>
                        <div className="title">{abode.title}</div>
                        <div className="price">${abode.price_per_night}/night</div>
                        <div className="reviews">
                            {/* <span className="stars"><FontAwesomeIcon icon="star" size="1x" /></span>
                            <span className="review-total">309 · Superhost</span> */}
                        </div>
                    </div>

                </Link>
            </div>
        )
    }

}

export default Abodes;