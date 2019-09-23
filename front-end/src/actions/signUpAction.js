import axios from 'axios'

export default (data) => {
    const signUpUrl = `${window.apiHost}/users/signup`
    const axiosResponse = axios.post(signUpUrl, data);
    return( {
        type: 'signUp',
        payload: axiosResponse
    })
}