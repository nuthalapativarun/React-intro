import * as actionTypes from './actionsTypes';

export const saveResult = (value) => {
    const updatedValue = value * 2;
    return {
        type: actionTypes.STORE_RESULT,
        value: updatedValue
    }
}

export const storeResult = (value) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(saveResult(value));
        }, 2000);
    }
};

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        id: id
    }
};