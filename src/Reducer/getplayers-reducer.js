import {getApiPlayers, playerSession} from "../API/Api";
const GET_PLAYERS = "GET_PLAYERS";
const GET_RESULT_PLAYERS_FOR_LOADER = "GET_RESULT_PLAYERS_FOR_LOADER";
const GET_OBJECT = "GET_OBJECT";
const GET_OBJECT_SESSION = "GET_OBJECT_SESSION";
const NUMBER_PAGE = "NUMBER_PAGE";
const PLAYER_ONE = "PLAYER_ONE";
let initialization = {
    AllPlayers: [],
    Result: '',
    Obj: [],
    ObjectSession: [],
    PlayerOne: '',
    NumberPage: 15,
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
        case NUMBER_PAGE:
            return {
                ...state,
                NumberPage: action.result
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
export let getNumberPage = (result) => ({type: NUMBER_PAGE, result});
export let getPlayersForAll = (data) => ({type: GET_PLAYERS, data});
export let getGamesForAllLoaderPlayers = (result) => ({type: GET_RESULT_PLAYERS_FOR_LOADER, result});
export let getObjj = (obj) => ({type: GET_OBJECT, obj});
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
export const getObj = (obj) =>
    (dispatch) => {
        dispatch(getObjj(obj));
    }
export const NumberPageAction = (result) =>
    (dispatch) => {
        dispatch(getNumberPage(result));
    }
export const searchPlayersThunk = (player) =>
    (dispatch) => {
        dispatch(getOnepl(player));
    }
export default GetPlayersReducer;
