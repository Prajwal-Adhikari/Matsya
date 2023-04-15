import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

//import reducers
import { provider, tokens, exchange } from './reducers'

//combine all reducers here
const reducer = combineReducers({
    provider, tokens, exchange
})

//initial states
const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;   