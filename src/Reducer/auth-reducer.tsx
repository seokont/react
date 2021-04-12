import {getTokenPlayer, logoutPlayer} from "../API/Api";
import Cookies from 'universal-cookie';

const ADD_TOKEN = "ADD_TOKEN";
const PASSWORD_ERROR = "PASSWORD_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";

const cookies = new Cookies();

type initializationTokenReducerType = {
    Token: string,
    Password: string,
    Login: string
}

let initialization: initializationTokenReducerType = {
    Token: cookies.get('Token') == undefined ? '' : cookies.get('Token'),
    Password: '',
    Login: '',
};

let TokenReducer = (state = initialization, action: any) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                Token: action.token
            };
        case PASSWORD_ERROR:
            return {

                ...state,
                Password: action.token
            };
        case LOGIN_ERROR:
            return {

                ...state,
                Login: action.token
            };

        default:
            return state;
    }
}

export let addPlayerToken = (token: any) => ({type: ADD_TOKEN, token});
export let loginError = (token: any) => ({type: LOGIN_ERROR, token});
export let passwordError = (token: any) => ({type: PASSWORD_ERROR, token});


export const addPlayerTokenThunk = (args: any) =>
    async (dispatch: any) => {
        let response = await getTokenPlayer.getPlayerToken(args);
        if (response.data === 'Login Error') {
            dispatch(loginError(response.data))
        }

        if (response.data === 'Password Error') {
            dispatch(passwordError(response.data))
        }

        if (response.data !== 'Login Error' && response.data !== 'Password Error' && response.data !== '') {
            dispatch(addPlayerToken(response.data));
            cookies.set('Token', response.data, {path: '/'});
            // localStorage.setItem("token", response.data);

        }

    }


// export const addLocalStorageTokenThunk = (token) =>
//     (dispatch) => {
//
//         dispatch(addPlayerToken(token));
//
//
//     }


export const logoutThunk = (args: any) =>

    async (dispatch: any) => {

        let response = await logoutPlayer.logoutPlayerAdd(args);


        if (response.data.Result === 'Ok') {
            dispatch(addPlayerToken(''));
            // localStorage.setItem("token", '');
            cookies.remove('Token', {path: '/'})
        }

        if (response.data.Result === "Error") {
            dispatch(addPlayerToken(''));
            // localStorage.setItem("token", '');
            cookies.remove('Token', {path: '/'})

        }

    }


export default TokenReducer;
