import React, { Component } from 'react';
import './Home.css';
import SearchBox from './SearchBox';
import Venue from '../utility/Venue';
import axios from 'axios';
import Abode from '../utility/Abodes/Abodes';

class Home extends Component {

    state = {
        cities: [], 
        abodes: []
    }

    async componentDidMount() {
        const recommendedCities = axios.get(`${window.apiHost}/cities`)
        recommendedCities.then( resp => {
            const cities = resp.data;
            this.setState( {
                cities: cities
            })
        })

        const axiosResponse = await axios.get(`${window.apiHost}/abodes`)
        const suggestedAbodes = axiosResponse.data.map( (abode, i) => 
            <div key={i} className='col s4'>
                <Abode abode={abode}/>
            </div>
            )
        this.setState( {
            abodes: suggestedAbodes
        })
    }

    render() {

        return (
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='home col s12'>
                            <div className='upper-fold'>
                                <SearchBox />
                            </div>
                        </div>
                        <div className='container'>
                            <div className='row'>
                                <div className='venue col s12'>
                                    <Venue cities={this.state.cities}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {this.state.abodes}
                    </div>
                </div>
            </>
        );
    }
}

export default Home;