import reqwest from 'reqwest'
import * as types from '../constants/ActionTypes'

export function fetchMovies() {
    return (dispatch, getState) => {
        const url = `${API}/。。。。。。。。`

        return reqwest(url)
            .then(resp => {
                dispatch(receiveMovies(resp.data.datas))
                return resp
            })
    }
}

function receiveMovies(movies) {
    return {
        type: types.RECEIVE_MOVIES,
        movies,
    }
}
