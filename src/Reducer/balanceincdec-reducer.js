import {playerBalance} from "../API/Api";


const BALANCE_PLAYERS_INC = "BALANCE_PLAYERS_INC";
const BALANCE_PLAYERS_DEC = "BALANCE_PLAYERS_DEC";
const GET_RESULT_PLAYERS_FOR_LOADER = "GET_RESULT_PLAYERS_FOR_LOADER";

let initialization = {

    ResultInc: '',
    ResultDec: '',
    Result:''
};

let BalanceReducer = (state = initialization, action) => {

    switch (action.type) {
        case BALANCE_PLAYERS_INC:
            return {
                ...state,
                ResultInc: action.data
            };

            case BALANCE_PLAYERS_DEC:
            return {
                ...state,
                ResultDec: action.data
            };

        default:
            return state;
    }
}
export let getIncBalance = (data) => ({type: BALANCE_PLAYERS_INC, data});
export let getDecBalance = (data) => ({type: BALANCE_PLAYERS_DEC, data});


export const authIncBalanceThunk = (summa,player) =>
    async (dispatch) => {

        let response = await playerBalance.incrementBalance(summa,player);
        if (response.status === 200) {
            dispatch(getIncBalance(response.data));

        }
    }

export const authDecBalanceThunk = (summa,player) =>
    async (dispatch) => {

        let response = await playerBalance.decrementBalance(summa,player);
        if (response.status === 200) {
            dispatch(getDecBalance(response.data));

        }
    }


export default BalanceReducer;
