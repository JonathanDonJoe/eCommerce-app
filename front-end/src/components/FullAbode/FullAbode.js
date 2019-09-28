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

    
    
    makePayment = () => {
        const pKey = 'pk_test_j8n4wEt1UK4RG2El9AOwDUq800MdbgIqj5'

        const amount = this.state.abode.price_per_night
        // const amount = document.getElementById('payment-amount').value;
        var handler = window.StripeCheckout.configure({
            key: pKey,
            locale: 'auto',
            // image: `${window.apiHost}${this.props.abode.image_url}`,
            image: ``,
            token: (token) => {
                console.log(token);
                console.log(this.props.auth.token);
                var theData = {
                    amount: Math.floor(amount * 100),
                    stripeToken: token.id,
                    userToken: this.props.auth.token,
                }
                axios({
                    method: 'POST',
                    url: `${window.apiHost}/payment/stripe`,
                    data: theData
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.msg === 'paymentSuccess') {
                        this.props.history.push('/thankyou')
                    }else if(response.data.msg === 'badToken'){
                        this.props.history.push('/login')
                    }else if(response.data.msg === 'paymentFailed'){
                        this.setState({
                            msg: `Payment was unsuccessful. Please email this to support: ${response.data.stripeError}`
                        })
                        console.lo(response.data.stripeError)
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'AirBnB Payment',
            amount: amount * 100 //the total is in pennies
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
                <div className="price">${abode.price_per_night} per night!</div>
                <div className="guests">Number of Guests: {abode.guests}</div>
                <div className="details">
                    Details: {abode.details}
                </div>
                <div className="amenities">
                    Amenities: {abode.amenities}
                </div>
                {/* <div className='col s4'>
                    <input onChange={this.changeDate1} value={this.state.date1} type='date'/>
                    <input onChange={this.changeDate2} value={this.state.date2} type='date'/>
                </div> */}
                <button onClick={this.makePayment} className='btn'>Reserve 1 Night</button>
            </div>
        );
    }
}

export default FullAbode;