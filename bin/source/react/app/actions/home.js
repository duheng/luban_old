import reqwest from 'reqwest'
import * as urls from '../constants/urls'
import * as types from '../constants/ActionTypes'

export const fetchMovies = () =>  {
    return (dispatch, getState) => {
        const url = `${urls.homeTop}?appid=1001&platform=1&sign=lexueying`
        return reqwest(url)
            .then(resp => {
              const { code, data, message } = resp;
              if(code == 0) {
                  dispatch({
                      type: types.RECEIVE_MOVIES,
                      movies: data,
                  })
              } else {
                console.error(`接口报错：${url}; ${message};`)

              }
            })
    }
}
