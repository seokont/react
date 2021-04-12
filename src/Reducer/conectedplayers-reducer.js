import {conPlayer} from "../API/Api";


const CON_PLAYER = "CON_PLAYER";


let initialization = {
    Allconected:{
        Result:'',
        Connections:'',
        SessionID:[],
        Status:[],
        Lang:[],
        PC:[],
        IP:[],
        Proxy:[],
        Connect:[],
        Login:[],
        LastAction:[],
        PacketsIn:[],
        PacketsOut:[]

    },

};

let ConectedPlayersReducer = (state = initialization, action) => {
    switch (action.type) {
        case CON_PLAYER:
            return {

                ...state,
                Allconected: {
                    Result:action.resultconected.Result,
                    Connections:action.resultconected.Connections,
                    Player:[...action.resultconected.Player],
                    SessionID:[...action.resultconected.SessionID],
                    Status:[...action.resultconected.Status],
                    Lang:[...action.resultconected.Lang],
                    PC:[...action.resultconected.PC],
                    IP:[...action.resultconected.IP],
                    Proxy:[...action.resultconected.Proxy],
                    Connect:[...action.resultconected.Connect],
                    Login:[...action.resultconected.Login],
                    LastAction:[...action.resultconected.LastAction],
                    PacketsIn:[...action.resultconected.PacketsIn],
                    PacketsOut:[...action.resultconected.PacketsOut]

                }
            };



        default:
            return state;
    }
}

export let conPlayerForGames = (resultconected) => ({type: CON_PLAYER, resultconected:resultconected});


export const conectedPlayersThunk=()=>
    async (dispatch)=>{

        let response = await conPlayer.conPlayerForApi();
        if (response.data.Result === "Ok") {
            dispatch(conPlayerForGames(response.data));

        }
    }

export default ConectedPlayersReducer;
