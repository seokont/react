import {OfflineOrOnline} from "../API/Api";


const ONLINE_GAMES = "ONLINE_GAMES";


let initialization = {
        Result:''
};

let OnlineGamesReducer = (state = initialization, action) => {

    switch (action.type) {

        case ONLINE_GAMES:
            return {

                ...state,
                Result: action.result
            };
        default:
            return state;
    }
}

export let onlineGamesForGames = (result) => ({type: ONLINE_GAMES, result:result});


export const onlineGameThunk=(name)=>
    async (dispatch)=>{

        let response = await OfflineOrOnline.onlineGamesForApi(name);
        if (response.data.Result === 'ok') {
            dispatch(onlineGamesForGames(response.data.Result));
        }
    }




export default OnlineGamesReducer;
