import * as actionTypes from './actionTypes';
import axios from 'axios';

export const switchEdit = () => {
    return{
        type: actionTypes.SWITCH_EDIT
    };
};

export const switchCreate = () => {
    console.log("Create")
    return{
        type: actionTypes.SWITCH_CREATE
    };
};

export const postComment = (config, body, id ,date,name, userId) => {
console.log(id)
    return dispatch => {

        const data = {
            body: body,
            time: date,
            post: id,
            name: name,
            userId: userId
        }

        axios.post('http://localhost:9000/comment', data, config )
        .then((res) => {
            console.log(res.data)
        })
        .catch((event) => {
            console.log(event)
        })
    }
}

export const postLike = (id, config) => {
    console.log(id)
        return dispatch => {

            let data = {
                id:id
            }
    
            axios.post('http://localhost:9000/like', data, config )
            .then((res) => {
                console.log(res.data)
                // window.location.reload(false);
            })
            .catch((event) => {
                console.log(event)
            })
        }
    }