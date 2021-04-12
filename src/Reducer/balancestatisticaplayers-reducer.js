import {getAllBalancePlayers} from "../API/Api";


const ADD_BAL_PLAYERS = "ADD_BAL_PLAYERS";


let initialization = {
    Object:[],
    Error:'',
    
};

let AllBalancePlayerReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_BAL_PLAYERS:
            return {

                ...state,
                Object: action.result
            };

        

        default:
            return state;
    }
}

export let addPAllBalancePlayers = (result) => ({type: ADD_BAL_PLAYERS, result:result});


export const addBalPlayersThunk=()=>
    async (dispatch)=>{
        
        let response = await getAllBalancePlayers.getPlayerBalancePlayers();
        if (response.status === 200) {
            dispatch(addPAllBalancePlayers(response.data));
          
        } 
    }

export default AllBalancePlayerReducer;
