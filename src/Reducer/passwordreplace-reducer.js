import {passwordReplace} from "../API/Api";

const PASSWORD_REPLACE = "PASSWORD_REPLACE";


let initialization = {
    Result: '',
};

let PasswordReplaceReducer = (state = initialization, action) => {
    switch (action.type) {
        case PASSWORD_REPLACE:
            return {
                ...state,
                Result: action.data
            };

        default:
            return state;
    }
}
export let getPasswordReplace = (data) => ({type: PASSWORD_REPLACE, data});

export const passwordReplaceThunk = (pass) =>
    async (dispatch) => {
        let response = await passwordReplace.replacePass(pass);
        if (response.status === 200) {
            dispatch(getPasswordReplace(response.data));

        }
    }


export default PasswordReplaceReducer;
