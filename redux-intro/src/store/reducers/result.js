import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArr = state.results.filter(result => result.id !== action.id);
    return updateObject(state, {results: updatedArr});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.STORE_RESULT):
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.value})})
        case (actionTypes.DELETE_RESULT):
            return deleteResult(state, action);
        default: return state;
    }
}

export default reducer;