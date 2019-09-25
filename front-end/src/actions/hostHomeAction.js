import axios from 'axios';

export default (data) => {
    console.log(data)
    const requestURL = `${window.apiHost}/host/homes`
    const axiosResponse = axios.post(requestURL, data)

    return( {
        type: 'hostHomeAction',
        payload: axiosResponse
    })
}