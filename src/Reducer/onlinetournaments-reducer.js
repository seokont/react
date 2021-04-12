import {OfflineOrOnlineTournaments} from "../API/Api";


const ONLINE_TOURNAMENTS = "ONLINE_TOURNAMENTS";


let initialization = {
        Result:''
};

let OnlineTournamentsReducer = (state = initialization, action) => {

    switch (action.type) {

        case ONLINE_TOURNAMENTS:
            return {

                ...state,
                Result: action.result
            };
        default:
            return state;
    }
}

export let onlineTournamentsForGames = (result) => ({type: ONLINE_TOURNAMENTS, result:result});


export const onlineTournamentsThunk=(name)=>
    async (dispatch)=>{

        let response = await OfflineOrOnlineTournaments.onlineTournamentsForApi(name);
        if (response.data.Result === 'ok') {
            dispatch(onlineTournamentsForGames(response.data.Result));
        }
    }




export default OnlineTournamentsReducer;
