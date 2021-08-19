import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return{
        type: actionTypes.AUTH_SUCCESS
    };
};

export const authFail = () => {
    return{
        type: actionTypes.AUTH_FAIL
    };
};

export const switchSign = () => {
    return{
        type: actionTypes.SWITCH_SIGN
    }
}

export const logout = () => {
    console.log('reached')
    localStorage.clear();
    return{
        type: actionTypes.LOGOUT
    }
}

export const deleteAcc = () => {
    return dispatch => {

        let config = {
            headers: {
                token: localStorage.getItem("token")
            }
        }

        axios.delete('http://localhost:9000/user/me', config)
        .then (response =>{
            dispatch(logout())
        }).catch(e => {
            console.log(e)
        })  
    }
}

export const auth = (name, email, pass, signup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name: name,
            email: email,
            password: pass
        };
        
        let url ="http://localhost:9000/login";

        if(signup){
            url = 'http://localhost:9000/register';
        }

        axios.post(url, authData)
        .then( response => {
            localStorage.setItem('id', response.data.user._id);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.user.name);
            dispatch(authSuccess());
        }).catch(e => {
            dispatch(authFail())
        })
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const authCheckState = () => {
    
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {

            dispatch(logout());
        } 
        // else {
            // const exp = new Date(localStorage.getItem('exp'));
            // console.log("loging out")
            // if (exp <= new Date()) {
            //     dispatch(logout());
            // } 
            else {
                dispatch(authSuccess());
                // dispatch(checkAuthTimeout((exp.getTime() - new Date().getTime()) / 1000 ));
            }   
        // }
    };
};