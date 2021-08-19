import * as actionTypes from "../actions/actionTypes";

const initialState = {
    edit_modal: false,
    create_modal: false
};

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.SWITCH_EDIT:
            return{
                ...state,
                edit_modal: !state.edit_modal
            }

        case actionTypes.SWITCH_CREATE:
            console.log("switch")
            return{
                ...state,
                create_modal: !state.create_modal
            }

        // case actionTypes.POST_COMMENT:

        // return{

        // }
        

        default:
            return state;
    }
}


export default reducer;
