export default () => {
    return waitASec;
}


function waitASec(dispatch, getState) {
    console.log('waitASec is running');
    setTimeout( () => {
        dispatch( {
            type: 'aThunkAction'
        })
    }, 2000)
}