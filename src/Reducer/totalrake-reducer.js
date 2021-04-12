import {getTotalRake} from "../API/Api";


const TOTAL_RAKE = "TOTAL_RAKE";


let initialization = {
    TotalRake:'',
    Result:''
};

let TotalRakeReducer = (state = initialization, action) => {
    switch (action.type) {
        case TOTAL_RAKE:
            return {

                ...state,
                TotalRake: action.result
            };
            

        

        default:
            return state;
    }
}

export let addTotalRake = (result) => ({type: TOTAL_RAKE, result:result});


export const addTotalRakeThunk=(args)=>
    async (dispatch)=>{
        let response = await getTotalRake.getTotalRakeAll(args);
        if (response.data.result === "Ok") {
            dispatch(addTotalRake(response.data.totalrake));
            
        } 
    }

export default TotalRakeReducer;
