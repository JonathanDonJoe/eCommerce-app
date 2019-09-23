export default (state = [], action) => {
    if (action.type === 'signUp') {
        // console.log(action.payload.data)
        return action.payload.data;
    }
    return state;
}