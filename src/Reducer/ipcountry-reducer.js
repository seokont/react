import {ippl} from "../API/Api";


const ADD_IMAGE_COUNTRY = "ADD_IMAGE_COUNTRY";
const ADD_PLAYER_RESULT_OK = "ADD_PLAYER_RESULT_OK";

let initialization = {
    ImgeGeo: [],
    Result: ''
};

let IpCountryReducer = (state = initialization, action) => {
    switch (action.type) {
        case ADD_IMAGE_COUNTRY:
            return {

                ...state,
                ImgeGeo: [...state.ImgeGeo, action.result]
            };

        case ADD_PLAYER_RESULT_OK:
            return {

                ...state,
                Result: action.result
            };

        default:
            return state;
    }
}

export let addPlayerImageCountry = (result) => ({type: ADD_IMAGE_COUNTRY, result: result});


export const addImageCountryThunk = (ip) =>

    async (dispatch) => {

        let response = await ippl.ipfunction(ip);
        if (response.data.Result === "Error") {
            dispatch(addPlayerImageCountry(response.data));

        }
    }

export default IpCountryReducer;
