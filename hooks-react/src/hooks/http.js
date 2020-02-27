import { useReducer, useCallback } from 'react';
const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
};
const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier}
        case 'RESPONSE':
            return { ...curHttpState, loading: false, data: action.responseData, extra: action.extra }
        case 'ERROR':
            return { loading: false, error: action.errorMessage }
        case 'CLEAR':
            return initialState;
        default: new Error('should not be reached');
    }
}

const useHttp = () => {
const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

const clear = useCallback(() => dispatchHttp({type: 'CLEAR'}), []);

const sendRequest = useCallback((url, method, body, extra, identifier) => {
    dispatchHttp({type: 'SEND', identifier: identifier});
    fetch(
        url, 
        {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: extra });

    }).catch(err => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong' });
    })
}, []);

return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    extra: httpState.extra,
    identifier: httpState.identifier,
    clear: clear
};


};

export default useHttp;
