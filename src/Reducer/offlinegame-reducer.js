import {OfflineOrOnline} from "../API/Api";

const OFFLINE_GAMES = "OFFLINE_GAMES";

let initialization = {
        Result:''
};

let OfflineGamesReducer = (state = initialization, action) => {

    switch (action.type) {



        case OFFLINE_GAMES:
            return {

                ...state,
                Result: action.result
            };


        default:
            return state;
    }
}

export let offlineGamesForGames = (result) => ({type: OFFLINE_GAMES, result:result});


export const offlineGameThunk=(name)=>
    async (dispatch)=>{

        let response = await OfflineOrOnline.offlineGamesForApi(name);
        if (response.data.Result === 'ok') {
            dispatch(offlineGamesForGames(response.data.Result));
        }
    }


export default OfflineGamesReducer;
