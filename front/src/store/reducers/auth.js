import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    loading: false,
    modal_show: false,
    auth: false
};

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true
            }

        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                auth: true,
                modal_show: false,
                loading: false

            }

        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading: false
            }


        case actionTypes.SWITCH_SIGN:
            return{
                ...state,
                modal_show: !state.modal_show
            }

        case actionTypes.LOGOUT:
            return{
                ...state,
                auth: false
            }

        default:
            return state;
    }
}

export default reducer;