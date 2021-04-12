import {getAllBalance} from "../API/Api";


const ADD_BAL = "ADD_BAL";


let initialization = {
    Object:[],
    Error:'',
    
};

let AllBalanceReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_BAL:
            return {

                ...state,
                Object: action.result
            };

        

        default:
            return state;
    }
}

export let addPAllBalance = (result) => ({type: ADD_BAL, result:result});


export const addBalThunk=()=>
    async (dispatch)=>{
        
        let response = await getAllBalance.getPlayerBalance();
        if (response.status === 200) {
            dispatch(addPAllBalance(response.data));
          
        } 
    }

export default AllBalanceReducer;
