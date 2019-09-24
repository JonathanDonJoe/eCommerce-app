export default (state = {}, action) => {
    console.log(action)
    if (action.type === 'signUp') {
        return action.payload.data;
    } else if (action.type === 'logout') {
        return {};
    } else if (action.type === 'login') {
        return action.payload.data
    }
    return state;
}