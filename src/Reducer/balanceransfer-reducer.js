import {balanceTransferPlayer} from "../API/Api";


const BALANCE_TRANSFER = "BALANCE_TRANSFER";
const BALANCE_TRANSFER_USER = "BALANCE_TRANSFER_USER";


let initialization = {


    Result: '',
    User: ''
};

let BalanceTransferReducer = (state = initialization, action) => {

    switch (action.type) {
        case BALANCE_TRANSFER:
            return {
                ...state,
                Result: action.data
            };


        case BALANCE_TRANSFER_USER:
            return {
                ...state,
                User: action.data
            };


        default:
            return state;
    }
}
export let getBalanceTransfer = (data) => ({type: BALANCE_TRANSFER, data});
export let getBalanceTransferUser = (data) => ({type: BALANCE_TRANSFER_USER, data});


export const authTransferBalanceThunk = (args) =>
    async (dispatch) => {

        let response = await balanceTransferPlayer.balanceTransfer(args);
        if (response.status === 200) {
            dispatch(getBalanceTransfer(response.data));

        }
    }


export const authTransferUserThunk = (user) =>
    (dispatch) => {

        dispatch(getBalanceTransferUser(user));


    }


export default BalanceTransferReducer;
