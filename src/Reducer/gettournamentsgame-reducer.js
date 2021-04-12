import { getApiTournamentsGames} from "../API/Api";

const GET_GAMES_TOURNAMENTS = "GET_GAMES_TOURNAMENTS";
const GET_RESULT_FOR_LOADER_TOURNAMENTS = "GET_RESULT_FOR_LOADER_TOURNAMENTS";
const GET_TOURN_OBJECT = "GET_TOURN_OBJECT";

let initialization = {
    AllRingGamesTournaments: [],
    Result:'',
    TournObj:[]
};

let GetTournamentsGamesReducer = (state = initialization, action) => {

    switch (action.type) {
        case GET_GAMES_TOURNAMENTS:
            return {
                ...state,
                AllRingGamesTournaments: [...action.data]
            };
            case GET_TOURN_OBJECT:
            return {
                ...state,
                TournObj: [...action.obj]
            };
        case GET_RESULT_FOR_LOADER_TOURNAMENTS:
            return {
                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}
export let getGamesTournamentsForAll = (data) => ({type: GET_GAMES_TOURNAMENTS,  data});
export let getGamesForTournamentsAllLoader = (result) => ({type: GET_RESULT_FOR_LOADER_TOURNAMENTS, result});
export let getTournamentsObj = (obj) => ({type: GET_TOURN_OBJECT, obj});

export const authTournamentsThunk = () =>
    async (dispatch) => {
        let response = await getApiTournamentsGames.getTornamentsGamesForApi();
        if (response.status === 200) {
            dispatch(getGamesTournamentsForAll(response.data));
            dispatch(getGamesForTournamentsAllLoader(response.data.Result));
        }
    }


export default GetTournamentsGamesReducer;
