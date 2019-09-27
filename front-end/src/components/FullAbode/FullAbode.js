import React, { Component } from 'react';
import './FullAbode.css';
import axios from 'axios';

class FullAbode extends Component {
    state = {
        cities: [],
        abode: []
    }

    async componentDidMount() {
        console.log(this.props)
        const abodeId = this.props.match.params.abodeId
        console.log(abodeId)

        const url = `${window.apiHost}/abode/${abodeId}`
        const axiosResponse = await axios.get(url);
        console.log(axiosResponse)
        this.setState({
            abode: axiosResponse.data
        })
    }

    render() {
        const abode = this.state.abode;
        console.log(abode)
        return (
            <div className='fullAbode col s12'>
                <img src={`${window.apiHost}${abode.image_url}`} alt=''></img>
                <div className="location">{abode.location}</div>
                <div className="title">{abode.title}</div>
                <div className="price">${abode.price} per night!</div>
                <div className="guests">Number of Guests: {abode.guests}</div>
                <div className="details">
                    Details: {abode.details}
                </div>
                <div className="amenities">
                    Amenities: {abode.amenities}
                </div>
            </div>
        );
    }
}

export default FullAbode;