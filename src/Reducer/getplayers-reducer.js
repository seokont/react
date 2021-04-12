import {getApiPlayers, playerSession} from "../API/Api";


const GET_PLAYERS = "GET_PLAYERS";
const GET_RESULT_PLAYERS_FOR_LOADER = "GET_RESULT_PLAYERS_FOR_LOADER";
const GET_OBJECT = "GET_OBJECT";
const GET_OBJECT_SESSION = "GET_OBJECT_SESSION";

const PLAYER_ONE = "PLAYER_ONE";




let initialization = {
    AllPlayers: [],
    Result: '',
    Obj:[],
    ObjectSession:[],
    PlayerOne:''
};

let GetPlayersReducer = (state = initialization, action) => {

    switch (action.type) {
        case GET_PLAYERS:
            return {
                ...state,
                AllPlayers: [...action.data]
            };
        case GET_RESULT_PLAYERS_FOR_LOADER:
            return {
                ...state,
                Result: action.result
            };


        case PLAYER_ONE:
            return {
                    ...state,
                    PlayerOne: action.player
                };

        case GET_OBJECT:
            return {
                ...state,
                // Obj: [...state.Obj, action.obj]
                Obj: [...action.obj]
            };
            case GET_OBJECT_SESSION:
            return {
                ...state,

                ObjectSession: [...state.ObjectSession, action.obj]
            };
        default:
            return state;
    }
}
export let getPlayersForAll = (data) => ({type: GET_PLAYERS, data});
export let getGamesForAllLoaderPlayers = (result) => ({type: GET_RESULT_PLAYERS_FOR_LOADER, result});
export let getObj = (obj) => ({type: GET_OBJECT, obj});
export let getObjSession = (obj) => ({type: GET_OBJECT_SESSION, obj});


export let getOnepl = (player) => ({type: PLAYER_ONE, player});


export const authPlayersThunk = () =>
    async (dispatch) => {
        let response = await getApiPlayers.getPlayersForApi();
        if (response.status === 200) {
            dispatch(getPlayersForAll(response.data));
            dispatch(getGamesForAllLoaderPlayers(response.data.Result));
        }
    }

export const authSessionThunk = (session) =>
    async (dispatch) => {

        let response = await playerSession.sessionPlayerForApi(session);
        if (response.status === 200) {
            dispatch(getObjSession(response.data));

        }
        
    }




    export const searchPlayersThunk = (player) =>
    (dispatch) => { 
             
            dispatch(getOnepl(player));       
        
    }


export default GetPlayersReducer;
