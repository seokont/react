import {getipplayer} from "../API/Api";


const GET_PLAYERS_IP = "GET_PLAYERS_IP";
const GET_RESULT_PLAYERS_FOR_LOADER = "GET_RESULT_PLAYERS_FOR_LOADER";


let initialization = {
    SessionID: [],
    Player: [],
    PC: [],
    IP: [],
    Result: '',

};

let GetPlayersForIpReducer = (state = initialization, action) => {

    switch (action.type) {
        case GET_PLAYERS_IP:
            return {
                ...state,
                SessionID: [...action.data.SessionID],
                Player: [...action.data.Player],
                PC: [...action.data.PC],
                IP: [...action.data.IP],
            };
        case GET_RESULT_PLAYERS_FOR_LOADER:
            return {
                ...state,
                Result: action.result
            };


        default:
            return state;
    }
}
export let getPlayersForIpAll = (data) => ({type: GET_PLAYERS_IP, data});
export let getGamesForAllLoaderPlayersIp = (result) => ({type: GET_RESULT_PLAYERS_FOR_LOADER, result});


export const authPlayersIpThunk = () =>
    async (dispatch) => {
        let response = await getipplayer.getipplayers();
        if (response.status === 200) {
            dispatch(getPlayersForIpAll(response.data));
            dispatch(getGamesForAllLoaderPlayersIp(response.data.Result));
        }
    }




export default GetPlayersForIpReducer;
