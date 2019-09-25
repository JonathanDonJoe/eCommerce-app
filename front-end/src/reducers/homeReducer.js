export default (state ={}, action) => {
    if (action.type === 'hostHomeAction') {
        console.log(action.payload.data)
        return action.payload.data;
    }

    return state;
}