import {getApiGames} from "../API/Api";

const GET_GAMES = "GET_GAMES";
const GET_RESULT_FOR_LOADER = "GET_RESULT_FOR_LOADER";
const GET_GAME_OBJECT = "GET_GAME_OBJECT";

let initialization = {
    AllRingGames: [],
    Result:'',
    GameObj:[]
};

let GetGamesReducer = (state = initialization, action) => {

    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                AllRingGames: [...action.data]
            };
        case GET_RESULT_FOR_LOADER:
            return {
                ...state,
                Result: action.result
            };

        case GET_GAME_OBJECT:
            return {
                ...state,
                GameObj: [...action.obj]
            };

        default:
            return state;
    }
}
export let getGamesForAll = (data) => ({type: GET_GAMES,  data});
export let getGamesForAllLoader = (result) => ({type: GET_RESULT_FOR_LOADER, result});
export let getGameObj = (obj) => ({type: GET_GAME_OBJECT, obj});

export const authThunk = () =>
    async (dispatch) => {
        let response = await getApiGames.getGamesForApi();
        if (response.status === 200) {
            dispatch(getGamesForAll(response.data));
            dispatch(getGamesForAllLoader(response.data.Result));
        }
    }


export default GetGamesReducer;
