import {OfflineOrOnlineTournaments} from "../API/Api";


const OFFLINE_TOURNAMENTS = "OFFLINE_TOURNAMENTS";

let initialization = {
        Result:''
};

let OfflineTournamentsReducer = (state = initialization, action) => {

    switch (action.type) {



        case OFFLINE_TOURNAMENTS:
            return {

                ...state,
                Result: action.result
            };


        default:
            return state;
    }
}

export let offlinetourForGames = (result) => ({type: OFFLINE_TOURNAMENTS, result:result});


export const offlinetournamentsThunk=(name)=>
    async (dispatch)=>{

        let response = await OfflineOrOnlineTournaments.offlineTournamentsForApi(name);
        if (response.data.Result === 'ok') {
            dispatch(offlinetourForGames(response.data.Result));
        }
    }


export default OfflineTournamentsReducer;
