import {createStore} from 'redux'
import reducer from '../Reducers'

const initialState =  {
    lister: [],
    deck: {main: [], extra: []},
    isLoading: false,
    hasMoreItemsToLoad: false,
    nextPageToLoad: ''
}

const store = createStore(reducer, initialState)

export default store