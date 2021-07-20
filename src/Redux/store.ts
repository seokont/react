import {applyMiddleware, combineReducers, createStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import DelGamesReducer from "../Reducer/delgame-reducer";
import OfflineGamesReducer from "../Reducer/offlinegame-reducer";
import OnlineGamesReducer from "../Reducer/onlinegame-reducer";
import GetGamesReducer from "../Reducer/getgame-reducer";
import {reducer as formReducer} from 'redux-form'
import AddTableReducer from "../Reducer/addtable-reducer";
import AddMessageTableReducer from "../Reducer/messagetable-reducer";
import EditTableReducer from "../Reducer/edittable-reducer";
import GetTournamentsGamesReducer from "../Reducer/gettournamentsgame-reducer";
import DelTournamentsReducer from "../Reducer/deltournaments-reducer";
import OnlineTournamentsReducer from "../Reducer/onlinetournaments-reducer";
import OfflineTournamentsReducer from "../Reducer/offlinetournaments-reducer";
import AddMessageTableTurnamentsReducer from "../Reducer/messagetableturnaments-reducer";
import AddTableTurnamentsReducer from "../Reducer/addtabletournaments-reducer";
import EditTournamentsReducer from "../Reducer/edittournament-reducer";
import GetPlayersReducer from "../Reducer/getplayers-reducer";
import AddPlayerReducer from "../Reducer/addplayer-reducer";
import EditPlayerReducer from "../Reducer/editplayer-reducer";
import DelPlayerReducer from "../Reducer/delplayer-reducer";
import ResetRakeAllReducer from "../Reducer/rsetrakeall-reducer";
import BalanceReducer from "../Reducer/balanceincdec-reducer";
import GetPlayersForIpReducer from "../Reducer/getplayersforip-reducer";
import IpCountryReducer from "../Reducer/ipcountry-reducer";
import ConectedPlayersReducer from "../Reducer/conectedplayers-reducer";
import TokenReducer from "../Reducer/auth-reducer";
import SessionReducer from "../Reducer/session-reducer";
import AllBalanceReducer from "../Reducer/balancestatistica-reducer";
import AllBalancePlayerReducer from "../Reducer/balancestatisticaplayers-reducer";
import TotalRakeReducer from "../Reducer/totalrake-reducer";
import BalanceTransferReducer from "../Reducer/balanceransfer-reducer";
import AllRakeReducer from "../Reducer/allrake-reducer";
import PasswordReplaceReducer from "../Reducer/passwordreplace-reducer";



let reducers = combineReducers({
        Getgamereducer: GetGamesReducer,
        Delgamereducer: DelGamesReducer,
        Offlinegamereducer: OfflineGamesReducer,
        Onlinelinegamereducer: OnlineGamesReducer,
        Addtablereducer: AddTableReducer,
        AddMessag: AddMessageTableReducer,
        EditMessag: EditTableReducer,
        Gettournaments: GetTournamentsGamesReducer,
        DelTournaments: DelTournamentsReducer,
        Onturnaments: OnlineTournamentsReducer,
        Offturnaments: OfflineTournamentsReducer,
        Messageournaments: AddMessageTableTurnamentsReducer,
        Addturnaments: AddTableTurnamentsReducer,
        EditTournaments: EditTournamentsReducer,
        GetPlayers: GetPlayersReducer,
        Addplayer: AddPlayerReducer,
        EditPlayerNice: EditPlayerReducer,
        Delplayer: DelPlayerReducer,
        Resetrake: ResetRakeAllReducer,
        Balance: BalanceReducer,
        GetPlayersIp: GetPlayersForIpReducer,
        GetCountryIp: IpCountryReducer,
        Conected: ConectedPlayersReducer,
        Token: TokenReducer,
        Session: SessionReducer,
        Allbalance: AllBalanceReducer,
        AllbalancePlayer: AllBalancePlayerReducer,
        TotalRake: TotalRakeReducer,
        Transfer: BalanceTransferReducer,
        Allrake: AllRakeReducer,
        Passworpreplace: PasswordReplaceReducer,
        form: formReducer

    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// window.store = store;
export default store;
