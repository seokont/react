import {getRakeAllDateAll} from "../API/Api";








const ADD_ALL_RAKE = "ADD_ALL_RAKE";



let initialization = {
    
    AllRake:[],
    
};

let AllRakeReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_ALL_RAKE:
            return {

                ...state,
                AllRake: action.rake
            }; 
                  

        default:
            return state;
    }
}

export let addRake = (rake) => ({type: ADD_ALL_RAKE, rake});



export const addAllRakeThunk=()=>
    async (dispatch)=>{
        
        let response = await getRakeAllDateAll.getRakeAllDate();
        
        
            dispatch( addRake(response.data))
        
        
                   
         
    }




    

export default AllRakeReducer;
