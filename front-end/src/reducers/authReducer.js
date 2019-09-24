export default (state = {}, action) => {
    if (action.type === 'signUp') {
        console.log(action.payload)
        return action.payload.data;
    } else if (action.type === 'logout') {
        return {};
    }
    return state;
}