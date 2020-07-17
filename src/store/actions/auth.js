import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = null;
        const signUpAPIUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        if (isSignup) {
            url = signUpAPIUrl;
        } else {
            url = signInUrl;
        }
        const APIKey = "AIzaSyBgYeoNKgiVA3NCDCsP0v8T-bVth0-ZDDk";
        axios.post(url + APIKey, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}