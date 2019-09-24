import axios from 'axios';

export default (data) => {
    console.log(data);
    const signUpUrl = `${window.apiHost}/users/login`
    const axiosResponse = axios.post(signUpUrl, data);
    return {
        type: 'login',
        payload: axiosResponse
    }
}