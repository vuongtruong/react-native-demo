import {createStore, combineReducers} from 'redux';
import placesReducer from './reducers/places';

const reducer = combineReducers({
    places: placesReducer
});

const configureStore = () => {
    return createStore(reducer);
};

export default configureStore;