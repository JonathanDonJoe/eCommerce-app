export default (state = [], action) => {
    if (action.type === 'signUp') {
        console.log(action.payload)
        return action.payload.data;
    }
    return state;
}