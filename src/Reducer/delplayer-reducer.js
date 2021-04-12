import {playerDel} from "../API/Api";


const DEL_PLAYER = "DEL_PLAYER";

let initialization = {
        Result:''
};

let DelPlayerReducer = (state = initialization, action) => {
    switch (action.type) {
        case DEL_PLAYER:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let delPlayerGames = (result) => ({type: DEL_PLAYER, result:result});

export const deletePlayerThunk=(name)=>
    async (dispatch)=>{

        let response = await playerDel.delPlayerForApi(name);
        if (response.data.Result === 'ok') {

            dispatch(delPlayerGames(response.data.Result));

        }
    }

export default DelPlayerReducer;
