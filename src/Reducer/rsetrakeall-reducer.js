import {resetallrake, resetuserrake} from "../API/Api";


const RESET_RAKE_USER = "RESET_RAKE_USER";
const RESET_RAKE_ALL = "RESET_RAKE_ALL";

let initialization = {
    Result: '',
    ResultOk: '',
};

let ResetRakeAllReducer = (state = initialization, action) => {
    switch (action.type) {
        case RESET_RAKE_ALL:
            return {
                ...state,
                Result: action.result
            };
            case RESET_RAKE_USER:
            return {
                ...state,
                ResultOk: action.result
            };
        default:
            return state;
    }
}

export let resetRakeAllForGames = (result) => ({type: RESET_RAKE_ALL, result: result});
export let resetResultRakeOk = (result) => ({type: RESET_RAKE_ALL, result: result});
export let resetResultRakeUserOk = (result) => ({type: RESET_RAKE_USER, result: result});

export const resetRakeAllThunk = () =>
    async (dispatch) => {

        let response = await resetallrake.resetallrakeForApi();
        if (response.data === 'ok') {
            dispatch(resetRakeAllForGames(response.data));
        }
    }


export const resetRakeUserThunk = (name) =>
    async (dispatch) => {
        let response = await resetuserrake.resetuserrakeForApi(name);
        if (response.data.Result === 'Ok') {
            dispatch(resetResultRakeUserOk(response.data.Result));
        }
    }


export default ResetRakeAllReducer;
