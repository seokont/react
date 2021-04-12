import {getApiGamesDelete} from "../API/Api";

const DEL_GAMES = "DEL_GAMES";

let initialization = {
        Result:''
};

let DelGamesReducer = (state = initialization, action) => {
    switch (action.type) {
        case DEL_GAMES:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let delGamesForGames = (result) => ({type: DEL_GAMES, result:result});

export const deleteGameThunk=(name)=>
    async (dispatch)=>{

        let response = await getApiGamesDelete.delGamesForApi(name);
        if (response.data.Result === 'ok') {

            dispatch(delGamesForGames(response.data.Result));

        }
    }

export default DelGamesReducer;
