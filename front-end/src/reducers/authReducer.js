export default (state = {}, action) => {
    if (action.type === 'signUp') {
        return action.payload.data;
    } else if (action.type === 'logout') {
        return {};
    } else if (action.type === 'login') {
        return action.payload.data
    // } else if(action.type === 'aThunkAction') {
    //     console.log('I got a thunk action')
    }
    return state;
}