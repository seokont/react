import {getApiTournamentsGamesDel} from "../API/Api";

const DEL_TOURNAMETS = "DEL_TOURNAMETS";

let initialization = {
        Result:''
};

let DelTournamentsReducer = (state = initialization, action) => {
    switch (action.type) {
        case DEL_TOURNAMETS:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let delTournamentsForGames = (result) => ({type: DEL_TOURNAMETS, result:result});

export const deleteTournamentsThunk=(name)=>
    async (dispatch)=>{

        let response = await getApiTournamentsGamesDel.delTornamentsGamesForApi(name);
        if (response.data.Result === 'ok') {

            dispatch(delTournamentsForGames(response.data.Result));

        }
    }

export default DelTournamentsReducer;
