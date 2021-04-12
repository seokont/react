import {getSessionPlayer} from "../API/Api";


const ADD_NAME = "ADD_NAME";
const ADD_BALANCE = "ADD_BALANCE";
const ADD_ROLE = "ADD_ROLE";
const ADD_SESSION = "ADD_SESSION";
const PASSWORD_ERROR = "PASSWORD_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";


let initialization = {

    Session:'',
    Password:'',
    Login:'',
    Name:'',
    Role:'',
    Balance:'',
};

let SessionReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_SESSION:
            return {

                ...state,
                Session: action.session
            };

            case ADD_NAME:
            return {
                ...state,
                Name: action.name
            };

            case ADD_ROLE:
            return {
                ...state,
                Role: action.role
            };
            case ADD_BALANCE:
                return {
                    ...state,
                    Balance: action.balance
                };
            case PASSWORD_ERROR:
            return {

                ...state,
                Password: action.session
            };
            case LOGIN_ERROR:
            return {

                ...state,
                Login: action.session
            };

        default:
            return state;
    }
}

export let addPlayerSession = (session) => ({type: ADD_SESSION, session});
export let addPlayerName = (name) => ({type: ADD_NAME, name});
export let addPlayerRole = (role) => ({type: ADD_ROLE, role});


export let addPlayerBalance = (balance) => ({type: ADD_BALANCE, balance});

export let loginError = (session) => ({type: LOGIN_ERROR, session});
export let passwordError = (session) => ({type: PASSWORD_ERROR, session});


export const addPlayerSessionThunk=(args)=>
    async (dispatch)=>{

        let response = await getSessionPlayer.getPlayerSession(args);

            if(response.data === 'Login Error' )  {
                dispatch( loginError(response.data))
            }

            if(response.data === 'Password Error' )  {
                dispatch(passwordError(response.data))
            }

            if(response.data !== 'Login Error' && response.data !== 'Password Error' && response.data !== ''){
                dispatch(addPlayerSession(response.data.session))
                dispatch(addPlayerName(response.data.name))
                dispatch(addPlayerRole(response.data.role))

            }

    }





    export const addSessionThunk=(role)=>(dispatch)=>{

        dispatch(addPlayerRole(role));
    }



    export const addNameThunk=(name)=>(dispatch)=>{

        dispatch(addPlayerName(name));
    }



    export const addBalanceThunk=(balance)=>(dispatch)=>{

        dispatch(addPlayerBalance(balance));
    }









export default SessionReducer;
