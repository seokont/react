import * as axios from "axios";

let istance = axios.create({
    // withCredentials: true,
    //headers: {"API-KEY": "650f94ea-79b5-4a28-9f55-c2cda6024f17"},
    baseURL: "https://mavensdev.xyz/wp-json/pokerapi/v1",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": `${localStorage.getItem("Token")}`
    },

})


let istanceforcountry = axios.create({
    //withCredentials: true,
    //headers: {"API-KEY": "650f94ea-79b5-4a28-9f55-c2cda6024f17"},
    baseURL: "http://ip-api.com/json"
})


export const ippl = {
    ipfunction(ip) {
        return istanceforcountry.get(`/${ip}`)
    },

}


export const getTokenPlayer = {
    getPlayerToken(args) {
        let pl1 = args[0];
        let pl2 = args[1];
        return istance.post(`/authplayer/?username=${pl1}&password=${pl2}`, {withCredentials: true})
    },

}


export const passwordReplace = {
    replacePass(pass) {
        let pl1 = pass[0];
        let pl2 = pass[1];
        return istance.post(`/passwordreplace/?name=${pl1}&password=${pl2}`)
    },

}


export const getAllBalance = {
    getPlayerBalance() {
        return istance.post(`/allbalance`)
    },

}


export const getTotalRake = {
    getTotalRakeAll(arg) {
        return istance.post(`/totalrake/?totalrake=${arg}`)
    },

}


export const getAllBalancePlayers = {
    getPlayerBalancePlayers() {
        return istance.get(`/allbalanceplayers`)
    },

}


export const balanceTransferPlayer = {
    balanceTransfer(args) {
        let pl1 = args[0];
        let pl2 = args[1];
        let pl3 = args[2];
        return istance.post(`/balancetransfer/?iam=${pl1}&username=${pl2}&amount=${pl3}`)
    },

}


export const getSessionPlayer = {
    getPlayerSession(args) {
        // let pl1 = args[0];
        // let pl2 = args[1];
        return istance.post(`/authsession/?token=${args}`)
    },

}


export const logoutPlayer = {
    logoutPlayerAdd(args) {
        return istance.post(`/logoutplayer/?player=${args}`)
    },

}


export const getRakeAllDateAll = {
    getRakeAllDate() {
        return istance.get(`/getrakealldate`)
    },

}


export const getApiPlayers = {
    getPlayersForApi() {
        return istance.get(`/getallpleyers`)
    },

}


export const conPlayer = {
    conPlayerForApi() {

        return istance.post(`/conectedallpleyers`)
    },

}


export const addPlayer = {
    addPlayerForApi(args) {
        let pl1 = args[0];
        let pl2 = args[1];
        let pl3 = args[2];
        let pl4 = args[3];
        let pl5 = args[4];
        let pl6 = args[5];
        let pl7 = args[6];
        let pl8 = args[7];
        let pl9 = args[8];
        let pl10 = args[9];
        let pl11 = args[10];
        let pl12 = args[11];
        let pl13 = args[12];
        let pl14 = args[13];
        let pl15 = args[14];
        let pl16 = args[15];
        let pl17 = args[16];
        let pl18 = args[17];
        let pl19 = args[18];
        let pl20 = args[19];
        let pl21 = args[20];
        let pl22 = args[21];
        let pl23 = args[22];
        let pl24 = args[23];
        let pl25 = args[24];
        let pl26 = args[25];
        let pl27 = args[26];
        let pl28 = args[27];
        let pl29 = args[28];
        let pl30 = args[29];
        let pl31 = args[30];
        let pl32 = args[31];
        let pl33 = args[32];
        let pl34 = args[33];
        let pl35 = args[34];
        let pl36 = args[35];
        return istance.post(`/addplayer/?player=${pl1}&adminprofile=${pl2}&title=${pl3}&level=${pl4}&realname=${pl5}&password=${pl6}&location=${pl7}&email=${pl8}&valcode=${pl9}&balance=${pl10}&balance2=${pl11}&lastreset=${pl12}&lastreset2=${pl13}&avatar=${pl14}&avatarfile=${pl15}&logins=${pl16}&firstlogin=${pl17}&lastlogin=${pl18}&gender=${pl19}&permissions=${pl20}&tickets=${pl21}&chipstransfer=${pl22}&chipstransfer2=${pl23}&chipsaccept=${pl24}&chipsaccept2=${pl25}&chat=${pl26}&chatcolor1=${pl27}&chatcolor2=${pl28}&custom=${pl29}&note=${pl30}&erake=${pl31}&erake2=${pl32}&prake=${pl33}&prake2=${pl34}&tfees=${pl35}&tfees2=${pl36}`)

    }
}


export const editPlayer = {
    editPlayerForApi(args) {
        let pl1 = args[0];
        let pl2 = args[1];
        let pl3 = args[2];
        let pl4 = args[3];
        let pl5 = args[4];
        let pl6 = args[5];
        let pl7 = args[6];
        let pl8 = args[7];
        let pl9 = args[8];
        let pl10 = args[9];
        let pl11 = args[10];
        let pl12 = args[11];
        let pl13 = args[12];
        let pl14 = args[13];
        let pl15 = args[14];
        let pl16 = args[15];
        let pl17 = args[16];
        let pl18 = args[17];
        let pl19 = args[18];
        let pl20 = args[19];
        let pl21 = args[20];
        let pl22 = args[21];
        let pl23 = args[22];
        let pl24 = args[23];
        let pl25 = args[24];
        let pl26 = args[25];
        let pl27 = args[26];
        let pl28 = args[27];
        let pl29 = args[28];
        let pl30 = args[29];
        let pl31 = args[30];
        let pl32 = args[31];
        let pl33 = args[32];
        let pl34 = args[33];
        let pl35 = args[34];
        let pl36 = args[35];
        return istance.post(`/editplayer/?player=${pl1}&adminprofile=${pl2}&title=${pl3}&level=${pl4}&realname=${pl5}&password=${pl6}&location=${pl7}&email=${pl8}&valcode=${pl9}&balance=${pl10}&balance2=${pl11}&lastreset=${pl12}&lastreset2=${pl13}&avatar=${pl14}&avatarfile=${pl15}&logins=${pl16}&firstlogin=${pl17}&lastlogin=${pl18}&gender=${pl19}&permissions=${pl20}&tickets=${pl21}&chipstransfer=${pl22}&chipstransfer2=${pl23}&chipsaccept=${pl24}&chipsaccept2=${pl25}&chat=${pl26}&chatcolor1=${pl27}&chatcolor2=${pl28}&custom=${pl29}&note=${pl30}&erake=${pl31}&erake2=${pl32}&prake=${pl33}&prake2=${pl34}&tfees=${pl35}&tfees2=${pl36}`)

    },
    getOnePlayer(name) {
        return istance.post(`/getuserforedit/?player=${name}`)
    },
}


export const playerDel = {
    delPlayerForApi(name) {
        return istance.post(`/deletplayer/?player=${name}`)
    },

}


export const playerSession = {
    sessionPlayerForApi(session) {
        return istance.post(`/getsessionlayer/?session=${session}`)
    },

}


export const playerBalance = {
    incrementBalance(summa, player) {
        return istance.post(`/incbalanceplayer/?summa=${summa}&player=${player}`)
    },
    decrementBalance(summa, player) {
        return istance.post(`/decbalanceplayer/?summa=${summa}&player=${player}`)
    },

}


export const resetallrake = {
    resetallrakeForApi() {
        return istance.post(`/resetrake/`)
    },

}


export const getipplayer = {
    getipplayers() {
        return istance.post(`/getipplayer/`)
    },

}


export const resetuserrake = {
    resetuserrakeForApi(name) {
        let j = new Date();

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
                return i;
            }
            return i;
        }

        let time = `${j.getFullYear()}-${addZero(j.getMonth() + 1)}-${addZero(j.getDate())} ${addZero(j.getHours())}:${addZero(j.getMinutes())}`;
        return istance.post(`/resetrakeuser/?player=${name}&lastreset=${time}`)
    },

}


export const getApiGames = {
    getGamesForApi() {
        return istance.get(`/getgames`)
    },

}


/*For Tournaments*/
export const getOneTournaments = {
    getTournamentsOneApi(name) {
        return istance.post(`/getonetour/?name=${name}`)

    }
}


export const getApiTournamentsGames = {
    getTornamentsGamesForApi() {
        return istance.get(`/gettournaments`)
    },

}

export const getApiTournamentsGamesDel = {

    delTornamentsGamesForApi(name) {
        return istance.post(`/delettournamentsgames/?name=${name}`)
    },

}

export const OfflineOrOnlineTournaments = {
    offlineTournamentsForApi(name) {
        return istance.post(`/offlinetournaments/?name=${name}`)

    },

    onlineTournamentsForApi(name) {
        return istance.post(`/onlinetournaments/?name=${name}`)

    }
}

export const textMessageTablesTurnaments = {
    messageTextTurnamentsForApi(name, message) {
        let k = (name.replace('%23', '#'));
        return istance.post(`/addmessagesturnaments/?message=${message}&name=${k}`)
    }
}


export const addTurnaments = {
    addTurnamentsForApi(args) {
        let tur1 = args[0]
        let tur2 = args[1]
        let tur3 = args[2]
        let tur4 = args[3]
        let tur5 = args[4]
        let tur6 = args[5]
        let tur7 = args[6]
        let tur8 = args[7]
        let tur9 = args[8]
        let tur10 = args[9]
        let tur11 = args[10]
        let tur12 = args[11]
        let tur13 = args[12]
        let tur14 = args[13]
        let tur15 = args[14]
        let tur16 = args[15]
        let tur17 = args[16]
        let tur18 = args[17]
        let tur19 = args[18]
        let tur20 = args[19]
        let tur21 = args[20]
        let tur22 = args[21]
        let tur23 = args[22]
        let tur24 = args[23]
        let tur25 = args[24]
        let tur26 = args[25]
        let tur27 = args[26]
        let tur28 = args[27]
        let tur29 = args[28]
        let tur30 = args[29]
        let tur31 = args[30]
        let tur32 = args[31]
        let tur33 = args[32]
        let tur34 = args[33]
        let tur35 = args[34]
        let tur36 = args[35]
        let tur37 = args[36]
        let tur38 = args[37]
        let tur39 = args[38]
        let tur40 = args[39]
        let tur41 = args[40]
        let tur42 = args[41]
        let tur43 = args[42]
        let tur44 = args[43]
        let tur45 = args[44]
        let tur46 = args[45]
        let tur47 = args[46]
        let tur48 = args[47]
        let tur49 = args[48]
        let tur50 = args[49]
        let tur51 = args[50]
        let tur52 = args[51]
        let tur53 = args[52]
        let tur54 = args[53]
        let tur55 = args[54]
        let tur56 = args[55]
        let tur57 = args[56]
        let tur58 = args[57]
        let tur59 = args[58]
        let tur60 = args[59]
        let tur61 = args[60]
        let tur62 = args[61]
        let tur63 = args[62]
        let tur64 = args[63]
        let tur65 = args[64]
        let tur66 = args[65]
        let tur67 = args[66]
        let tur68 = args[67]
        let tur69 = args[68]
        let tur70 = args[69]
        let tur71 = args[70]
        let tur72 = args[71]
        let tur73 = args[72]
        let tur74 = args[73]
        let tur75 = args[74]
        let tur76 = args[75]
        let tur77 = args[76]
        let tur78 = args[77]
        let tur79 = args[78]
        let tur80 = args[79]
        let tur81 = args[80]
        let tur82 = args[81]
        let tur83 = args[82]
        let tur84 = args[83]
        return istance.post(`/addtableturnaments/?gameid=${tur1}&description=${tur2}&autostart=${tur3}&gametype=${tur4}&mixedlist=${tur67}${tur68}${tur69}${tur70}${tur71}${tur72}${tur73}${tur74}${tur75}${tur76}${tur77}${tur78}${tur79}${tur80}${tur81}${tur82}${tur83}${tur84}&shootout=${tur6}&password=${tur7}&private=${tur8}&permregister=${tur9}&permunregister=${tur10}&permobserve=${tur11}&permplayerchat=${tur12}&permobserverchat=${tur13}&suspendchatallin=${tur14}&tables=${tur15}&seats=${tur16}&startfull=${tur17}&startmin=${tur18}&startcode=${tur19}&starttime=${tur20}&regminutes=${tur21}&lateregminutes=${tur22}&latepenalty=${tur23}&minplayers=${tur24}&recurminutes=${tur25}&resetseconds=${tur26}&maxruns=${tur27}&noshowminutes=${tur28}&primarycurrency=${tur29}&buyin=${tur30}&bounty=${tur31}&entryfee=${tur32}&ticket=${tur33}&ticketrequired=${tur34}&ticketfunded=${tur35}&prizebonus=${tur36}&multiplybonus=${tur37}&startingchips=${tur38}&bonusticket=${tur39}&addonchips=${tur40}&turnclock=${tur41}&turnwarning=${tur42}&bankclock=${tur43}&banksync=${tur44}&bankreset=${tur45}&disprotect=${tur46}&levelduration=${tur47}&rebuylevels=${tur48}&threshold=${tur49}&maxrebuys=${tur50}&rebuycost=${tur51}&rebuyfee=${tur52}&breaktime=${tur53}&breakinterval=${tur54}&breaksync=${tur55}&stoponchop=${tur56}&propchop=${tur57}&bringinpercent=${tur58}&blinds=${tur59}&payout=${tur60}&payoutfractions=${tur61}&payouttickets=${tur62}&unreglogout=${tur63}&tablegraphic=${tur64}&tablegraphicfinal=${tur65}&note=${tur66}`)


    }
}


export const editTurnaments = {
    editTurnamentsForApi(args) {
        let tur1 = args[0]
        let tur2 = args[1]
        let tur3 = args[2]
        let tur4 = args[3]
        let tur5 = args[4]
        let tur6 = args[5]
        let tur7 = args[6]
        let tur8 = args[7]
        let tur9 = args[8]
        let tur10 = args[9]
        let tur11 = args[10]
        let tur12 = args[11]
        let tur13 = args[12]
        let tur14 = args[13]
        let tur15 = args[14]
        let tur16 = args[15]
        let tur17 = args[16]
        let tur18 = args[17]
        let tur19 = args[18]
        let tur20 = args[19]
        let tur21 = args[20]
        let tur22 = args[21]
        let tur23 = args[22]
        let tur24 = args[23]
        let tur25 = args[24]
        let tur26 = args[25]
        let tur27 = args[26]
        let tur28 = args[27]
        let tur29 = args[28]
        let tur30 = args[29]
        let tur31 = args[30]
        let tur32 = args[31]
        let tur33 = args[32]
        let tur34 = args[33]
        let tur35 = args[34]
        let tur36 = args[35]
        let tur37 = args[36]
        let tur38 = args[37]
        let tur39 = args[38]
        let tur40 = args[39]
        let tur41 = args[40]
        let tur42 = args[41]
        let tur43 = args[42]
        let tur44 = args[43]
        let tur45 = args[44]
        let tur46 = args[45]
        let tur47 = args[46]
        let tur48 = args[47]
        let tur49 = args[48]
        let tur50 = args[49]
        let tur51 = args[50]
        let tur52 = args[51]
        let tur53 = args[52]
        let tur54 = args[53]
        let tur55 = args[54]
        let tur56 = args[55]
        let tur57 = args[56]
        let tur58 = args[57]
        let tur59 = args[58]
        let tur60 = args[59]
        let tur61 = args[60]
        let tur62 = args[61]
        let tur63 = args[62]
        let tur64 = args[63]
        let tur65 = args[64]
        let tur66 = args[65]
        let tur67 = args[66]
        let tur68 = args[67]
        let tur69 = args[68]
        let tur70 = args[69]
        let tur71 = args[70]
        let tur72 = args[71]
        let tur73 = args[72]
        let tur74 = args[73]
        let tur75 = args[74]
        let tur76 = args[75]
        let tur77 = args[76]
        let tur78 = args[77]
        let tur79 = args[78]
        let tur80 = args[79]
        let tur81 = args[80]
        let tur82 = args[81]
        let tur83 = args[82]
        let tur84 = args[83]
        return istance.post(`/edittableturnaments/?gameid=${tur1}&description=${tur2}&autostart=${tur3}&gametype=${tur4}&mixedlist=${tur67}${tur68}${tur69}${tur70}${tur71}${tur72}${tur73}${tur74}${tur75}${tur76}${tur77}${tur78}${tur79}${tur80}${tur81}${tur82}${tur83}${tur84}&shootout=${tur6}&password=${tur7}&private=${tur8}&permregister=${tur9}&permunregister=${tur10}&permobserve=${tur11}&permplayerchat=${tur12}&permobserverchat=${tur13}&suspendchatallin=${tur14}&tables=${tur15}&seats=${tur16}&startfull=${tur17}&startmin=${tur18}&startcode=${tur19}&starttime=${tur20}&regminutes=${tur21}&lateregminutes=${tur22}&latepenalty=${tur23}&minplayers=${tur24}&recurminutes=${tur25}&resetseconds=${tur26}&maxruns=${tur27}&noshowminutes=${tur28}&primarycurrency=${tur29}&buyin=${tur30}&bounty=${tur31}&entryfee=${tur32}&ticket=${tur33}&ticketrequired=${tur34}&ticketfunded=${tur35}&prizebonus=${tur36}&multiplybonus=${tur37}&startingchips=${tur38}&bonusticket=${tur39}&addonchips=${tur40}&turnclock=${tur41}&turnwarning=${tur42}&bankclock=${tur43}&banksync=${tur44}&bankreset=${tur45}&disprotect=${tur46}&levelduration=${tur47}&rebuylevels=${tur48}&threshold=${tur49}&maxrebuys=${tur50}&rebuycost=${tur51}&rebuyfee=${tur52}&breaktime=${tur53}&breakinterval=${tur54}&breaksync=${tur55}&stoponchop=${tur56}&propchop=${tur57}&bringinpercent=${tur58}&blinds=${tur59}&payout=${tur60}&payoutfractions=${tur61}&payouttickets=${tur62}&unreglogout=${tur63}&tablegraphic=${tur64}&tablegraphicfinal=${tur65}&note=${tur66}`)


    }
}


/*For Tournaments End*/


export const textMessageTables = {
    messageTextGamesForApi(name, message) {
        let k = (name.replace('%23', '#'));
        return istance.post(`/addmessages/?message=${message}&name=${k}`)
    }
}


export const getApiGamesDelete = {
    delGamesForApi(name) {
        return istance.post(`/deletgames/?name=${name}`)

    }
}


export const getOneGames = {
    getGamesOneApi(name) {
        return istance.post(`/getonegames/?name=${name}`)

    }
}


export const OfflineOrOnline = {
    offlineGamesForApi(name) {
        return istance.post(`/offlinegames/?name=${name}`)

    },

    onlineGamesForApi(name) {
        return istance.post(`/onlinegames/?name=${name}`)

    }
}

export const addTableApiGames = {
    addTableForApi(args) {
        let lat1 = args[0];
        let lat2 = args[1];
        let lat3 = args[2];
        let lat4 = args[3];
        let lat5 = args[4];
        let lat6 = args[5];
        let lat7 = args[6];
        let lat8 = args[7];
        let lat9 = args[8];
        let lat10 = args[9];
        let lat11 = args[10];
        let lat12 = args[11];
        let lat13 = args[12];
        let lat14 = args[13];
        let lat15 = args[14];
        let lat16 = args[15];
        let lat17 = args[16];
        let lat18 = args[17];
        let lat19 = args[18];
        let lat20 = args[19];
        let lat21 = args[20];
        let lat22 = args[21];
        let lat23 = args[22];
        let lat24 = args[23];
        let lat25 = args[24];
        let lat26 = args[25];
        let lat27 = args[26];
        let lat28 = args[27];
        let lat29 = args[28];
        let lat30 = args[29];
        let lat31 = args[30];
        let lat32 = args[31];
        let lat33 = args[32];
        let lat34 = args[33];
        let lat35 = args[34];
        let lat36 = args[35];
        let lat37 = args[36];
        let lat38 = args[37];
        let lat39 = args[38];
        let lat40 = args[39];
        let lat41 = args[40];
        let lat42 = args[41];

        let tur67 = args[42]
        let tur68 = args[43]
        let tur69 = args[44]
        let tur70 = args[45]
        let tur71 = args[46]
        let tur72 = args[47]
        let tur73 = args[48]
        let tur74 = args[49]
        let tur75 = args[50]
        let tur76 = args[51]
        let tur77 = args[52]
        let tur78 = args[53]
        let tur79 = args[54]
        let tur80 = args[55]
        let tur81 = args[56]
        let tur82 = args[57]
        let tur83 = args[58]
        let tur84 = args[59]


        return istance.post(`/addtable/?name=${lat1}&description=${lat2}&auto=${lat3}&game=${lat4}&mixedlist=${tur67}${tur68}${tur69}${tur70}${tur71}${tur72}${tur73}${tur74}${tur75}${tur76}${tur77}${tur78}${tur79}${tur80}${tur81}${tur82}${tur83}${tur84}&mixedhands=${lat6}&pw=${lat7}&private=${lat8}&permplay=${lat9}&permobserve=${lat10}&permplayerchat=${lat11}&permobserverchat=${lat12}&suspendchatallin=${lat13}&seats=${lat14}&primarycurrency=${lat15}&smallestchip=${lat16}&buyinmin=${lat17}&buyinmax=${lat18}&buyindef=${lat19}&caplimit=${lat20}&rakepercent=${lat21}&rakecap=${lat22}&turnclock=${lat23}&turnwarning=${lat24}&timebank=${lat25}&banksync=${lat26}&bankreset=${lat27}&disprotect=${lat28}&smallblind=${lat29}&bigblind=${lat30}&allowstraddle=${lat31}&smallbet=${lat32}&bigbet=${lat33}&ante=${lat34}&anteall=${lat35}&bringin=${lat36}&dupeips=${lat37}&ratholeminutes=${lat38}&sitoutminutes=${lat39}&sitoutrelaxed=${lat40}&tablegraphic=${lat41}&note=${lat42}`)


    }
}


export const editTableApiGames = {

    editTableForApi(args) {
        let lat1 = args[0];
        let lat2 = args[1];
        let lat3 = args[2];
        let lat4 = args[3];
        let lat5 = args[4];
        let lat6 = args[5];
        let lat7 = args[6];
        let lat8 = args[7];
        let lat9 = args[8];
        let lat10 = args[9];
        let lat11 = args[10];
        let lat12 = args[11];
        let lat13 = args[12];
        let lat14 = args[13];
        let lat15 = args[14];
        let lat16 = args[15];
        let lat17 = args[16];
        let lat18 = args[17];
        let lat19 = args[18];
        let lat20 = args[19];
        let lat21 = args[20];
        let lat22 = args[21];
        let lat23 = args[22];
        let lat24 = args[23];
        let lat25 = args[24];
        let lat26 = args[25];
        let lat27 = args[26];
        let lat28 = args[27];
        let lat29 = args[28];
        let lat30 = args[29];
        let lat31 = args[30];
        let lat32 = args[31];
        let lat33 = args[32];
        let lat34 = args[33];
        let lat35 = args[34];
        let lat36 = args[35];
        let lat37 = args[36];
        let lat38 = args[37];
        let lat39 = args[38];
        let lat40 = args[39];
        let lat41 = args[40];
        let lat42 = args[41];
        let lat43 = args[42];

        return istance.post(`/edittable/?name=${lat43}&description=${lat2}&auto=${lat3}&game=${lat4}&mixedlist=${lat5}&mixedhands=${lat6}&pw=${lat7}&private=${lat8}&permplay=${lat9}&permobserve=${lat10}&permplayerchat=${lat11}&permobserverchat=${lat12}&suspendchatallin=${lat13}&seats=${lat14}&primarycurrency=${lat15}&smallestchip=${lat16}&buyinmin=${lat17}&buyinmax=${lat18}&buyindef=${lat19}&caplimit=${lat20}&rakepercent=${lat21}&rakecap=${lat22}&turnclock=${lat23}&turnwarning=${lat24}&timebank=${lat25}&banksync=${lat26}&bankreset=${lat27}&disprotect=${lat28}&smallblind=${lat29}&bigblind=${lat30}&allowstraddle=${lat31}&smallbet=${lat32}&bigbet=${lat33}&ante=${lat34}&anteall=${lat35}&bringin=${lat36}&dupeips=${lat37}&ratholeminutes=${lat38}&sitoutminutes=${lat39}&sitoutrelaxed=${lat40}&tablegraphic=${lat41}&note=${lat42}&newname=${lat1}`)


    }
}





