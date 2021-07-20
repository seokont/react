import React from "react";
import style from './Edittournament.module.css';
import {Field, reduxForm, reset} from "redux-form";
import {NavLink} from "react-router-dom";
import {myInputs, mySelected} from "../../forinput/newinput";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Button} from "@material-ui/core";
import {keyframes} from 'styled-components';
import styled from 'styled-components'
import {zoomIn} from 'react-animations';
import {editTournamentsThunk} from "../../Reducer/edittournament-reducer";
const Bounce = styled.div`animation: 0.5s ${keyframes`${zoomIn}`} ease-out`;
const FormEditTournaments = (props) => {
    let adValueFromSelect = (value) => {
        if (value === 'Mixed') {
            props.mixedThunk(value);
        }
        props.mixedThunk(value);
    }
    // let massiv = ["Limit Hold'em", "Pot Limit Hold'em", "No Limit Hold'em", "Limit Omaha", "Pot Limit Omaha", "No Limit Omaha", "Limit Omaha-5", "Pot Limit Omaha-5", "No Limit Omaha-5", "Limit Omaha Hi-Lo", "Pot Limit Omaha Hi-Lo", "No Limit Omaha Hi-Lo", "Limit Omaha-5 Hi-Lo", "Pot Limit Omaha-5 Hi-Lo", "No Limit Omaha-5 Hi-Lo", "Limit Razz", "Limit Stud", "Limit Stud Hi-Lo"];
    // let g = props.EditMessag.Object.MixedList;
    // let rse = () => {
    //     let a = g.split(',');
    //     for (let i = 0; i < a.length; i++) {
    //         if (massiv.indexOf(a[i])) {
    //             console.log(massiv.indexOf(a[i]))
    //         }
    //     }
    //     return a;
    // }
    // rse();
    return (
        <div>
            <form onSubmit={props.handleSubmit} style={{marginTop:'20px'}}>
                <table className={style.table_new_edittournament}>
                    <tbody>
                    <tr>
                        <th colSpan="2"><h2>Edit Tournament: {props.EditMessag.Object.Name}</h2></th>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td><Field className="stretch" type="text" name={"GameID"} component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.Name}
                                   title="Specify a unique tournament name, up to 40 characters."/></td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td><Field className="stretch" type="text" name={"Description"} value="" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.Description}
                                   title="This is an optional description, up to 500 characters. It is displayed at the top of the tournament's information window and may include HTML tags, including links. See help file for details."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Auto online:</td>
                        <td><Field className="stretch" name={"AutoStart"} component={'select'} className={style.form_select}
                                   title="When this option is set to Yes, the tournament table will be put online when the game server is started. Otherwise tables must be manually put online with the Action button.">
                            <option value={props.EditMessag.Object.Auto}
                                    disabled>{props.EditMessag.Object.Auto}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Game:</td>
                        <td><Field className="stretch" name={"GameType"} component={'select'} className={style.form_select}
                                   onChange={(event) => adValueFromSelect(event.target.value)}
                                   title="Select a Hold'em, Omaha, Omaha-5, Razz, 7-Card Stud, or Mixed game. When Mixed is selected, fill in the Mixed field also. Only Limit games are available in the Trial Version.">
                            <option value={props.EditMessag.Object.Game}>{props.EditMessag.Object.Game}</option>
                            {/*<option value="No Limit Hold'em">No Limit Hold'em</option>*/}
                            {/*<option value="Limit Hold'em">Limit Hold'em</option>*/}
                            {/*<option value="Pot Limit Hold'em">Pot Limit Hold'em</option>*/}
                            {/*<option value="No Limit Hold'em" selected="">No Limit Hold'em</option>*/}
                            {/*<option value="Limit Omaha">Limit Omaha</option>*/}
                            {/*<option value="Pot Limit Omaha">Pot Limit Omaha</option>*/}
                            {/*<option value="No Limit Omaha">No Limit Omaha</option>*/}
                            {/*<option value="Limit Omaha Hi-Lo">Limit Omaha Hi-Lo</option>*/}
                            {/*<option value="Pot Limit Omaha Hi-Lo">Pot Limit Omaha Hi-Lo</option>*/}
                            {/*<option value="No Limit Omaha Hi-Lo">No Limit Omaha Hi-Lo</option>*/}
                            {/*<option value="Limit Omaha-5">Limit Omaha-5</option>*/}
                            {/*<option value="Pot Limit Omaha-5">Pot Limit Omaha-5</option>*/}
                            {/*<option value="No Limit Omaha-5">No Limit Omaha-5</option>*/}
                            {/*<option value="Limit Omaha-5 Hi-Lo">Limit Omaha-5 Hi-Lo</option>*/}
                            {/*<option value="Pot Limit Omaha-5 Hi-Lo">Pot Limit Omaha-5 Hi-Lo</option>*/}
                            {/*<option value="No Limit Omaha-5 Hi-Lo">No Limit Omaha-5 Hi-Lo</option>*/}
                            {/*<option value="Limit Razz">Limit Razz</option>*/}
                            {/*<option value="Limit Stud">Limit Stud</option>*/}
                            {/*<option value="Limit Stud Hi-Lo">Limit Stud Hi-Lo</option>*/}
                            {/*<option value="Mixed">Mixed</option>*/}
                        </Field></td>
                    </tr>
                    {props.EditMessag.Object.Game === 'Mixed' ? <tr>
                        <td>Mixed:</td>
                        {/*<td>Limit Razz: <Field className="stretch" type="checkbox" name={"MixedList1"} value="" component={'input'} className={style.form_input}*/}
                        {/*           title="Select a list of games when Game type is set to Mixed, otherwise leave blank. Each game is played for a full level and the list loops indefinitely."/>*/}
                        <td>
                            <Bounce>
                                {props.EditMessag.Object.MixedList}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on1"}  checked/>Limit*/}
                                {/*Hold'em<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on2"} />Pot Limit*/}
                                {/*Hold'em <br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on3"}/>No Limit*/}
                                {/*Hold'em<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on4"}/>Limit Omaha<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on5"}/>Pot Limit*/}
                                {/*Omaha<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on6"}/>No Limit*/}
                                {/*Omaha<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on7"}/>Limit Omaha*/}
                                {/*Hi-Lo<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on8"}/>Pot Limit*/}
                                {/*Omaha*/}
                                {/*Hi-Lo<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on9"}/>No Limit Omaha*/}
                                {/*Hi-Lo<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on10"}/>Limit*/}
                                {/*Omaha-5<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on11"}/>Pot Limit*/}
                                {/*Omaha-5<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on12"}/>No Limit*/}
                                {/*Omaha-5<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on13"}/>Limit Omaha-5*/}
                                {/*Hi-Lo<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on14"}/>Pot Limit*/}
                                {/*Omaha-5 Hi-Lo<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on15"}/>No Limit*/}
                                {/*Omaha-5*/}
                                {/*Hi-Lo<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on16"}/>Limit Razz<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on17"}/>Limit Stud<br></br>*/}
                                {/*<Field type="checkbox" component={'input'} className={style.form_input} name={"on18"}/>Limit Stud Hi-Lo<br></br>*/}
                            </Bounce>
                        </td>
                    </tr> : ''}
                    <tr>
                        <td>Shootout:</td>
                        <td><Field className="stretch" name={"Shootout"} component={'select'} className={style.form_select}
                                   placeholder={props.EditMessag.Object.Shootout}
                                   title="Select Yes for a shootout format where all tables play down to a single player before merging. Select No for a standard format with auto table balancing. Late registration and rebuys are not available for shootout tournaments.">
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><Field className="stretch" type="text" name={"Password"} value="" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.PW}
                                   title="Specify a password needed to register for this tournament or leave this field blank for an open tournament. You can also use the register permission to restrict play to specific players."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Private:</td>
                        <td><Field className="stretch" name={"Private"} component={'select'} className={style.form_select}
                                   title="If a password is set for the tournament, select Yes to make it completely private or select No to allow observers to watch. You can also use the observe permission to restrict observers.">
                            <option>{props.EditMessag.Object.Private}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Register permission:</td>
                        <td><Field className="stretch" type="text" name={"PermRegister"} value="" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.PermRegister}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict registration to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the password setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Unregister permission:</td>
                        <td><Field className="stretch" type="text" name={"PermUnregister"} value="" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.PermUnregister}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict unregistration to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the password setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Observe permission:</td>
                        <td><Field className="stretch" type="text" name={"PermObserve"} value="" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.PermObserve}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict observing to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the private setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Player chat permission:</td>
                        <td><Field className="stretch" type="text" name={"PermPlayerChat"} value="" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.PermPlayerChat}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict table chat to players who have the same token. Prefix with a dash (-) to only exclude players who have the token. Leave blank to allow chat from all seated players."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Observer chat permission:</td>
                        <td><Field className="stretch" type="text" name={"PermObserverChat"} value=""
                                   placeholder={props.EditMessag.Object.PermObserverChat}
                                   component={'input'} className={style.form_input}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict table chat to observers who have the same token. Prefix with a dash (-) to only exclude players who have the token. Leave blank to allow chat from all observers."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Suspend chat all-in:</td>
                        <td><Field className="stretch" name={"SuspendChatAllIn"} component={'select'} className={style.form_select}
                                   title="Select Yes to suspend the table chat when any player has an all-in bet.">
                            <option>{props.EditMessag.Object.SuspendChatAllIn}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Tables:</td>
                        <td><Field className="stretch" type="text" name={"Tables"} placeholder="1" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.Tables}
                                   title="Select the number of tables in the tournament, from 1 to 100 (Pro/Gold version only). Set to 1 for the Lite or Trial version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Seats per table:</td>
                        <td><Field className="stretch" type="text" name={"Seats"} placeholder="9" component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.Seats}
                                   title="Select the number of seats at each table, from 2 to 10."/></td>
                    </tr>
                    <tr>
                        <td>Start when full:</td>
                        <td><Field className="stretch" name={"StartFull"} component={'select'} className={style.form_select}
                                   title="Select Yes and the tournament will automatically start when enough players register to fill all seats. When this setting is enabled (along with System tab -> Client Settings -> Sit and Go tab), the tournament will be listed under the &quot;Sit &amp; Go&quot; tab in the client.">
                            <option>{props.EditMessag.Object.StartFull}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Start now:</td>
                        <td><Field className="stretch" type="text" name={"StartMin"} component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.StartMin}
                                   title="This is the minimum number of registered players that must check their &quot;Start Now&quot; box to start the tournament immediately. Select 0 to disable this feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Start code:</td>
                        <td><Field className="stretch" type="text" name={"StartCode"}
                                   placeholder={props.EditMessag.Object.StartCode}
                                   component={'input'} className={style.form_input}
                                   title="This is a code (1 to 999999) that can be entered in the Lobby window (Options menu) to start the tournament. Enter 0 to disable this feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Start time:</td>
                        <td><Field className="stretch" type="text" name={"StartTime"}
                                   placeholder={props.EditMessag.Object.StartTime}
                                   component={'input'} className={style.form_input}
                                   title="Enter a fixed time to auto-start the tournament in yyyy-mm-dd hh:mm format. Enter 0000-00-00 00:00 to disable this feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Registration period:</td>
                        <td><Field className="stretch" type="text" name={"RegMinutes"}
                                   placeholder={props.EditMessag.Object.RegMinutes}
                                   component={'input'} className={style.form_input}
                                   title="Set the number of minutes available for registration prior to the start time, up to 999999. A value of 0 represents an unlimited period. A value of -1 prevents registrations until the current tournament has completed."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Late registration:</td>
                        <td><Field className="stretch" type="text" name={"LateRegMinutes"}
                                   placeholder={props.EditMessag.Object.LateRegMinutes}
                                   component={'input'} className={style.form_input}
                                   title="Set the number of minutes available for late registration, 0 to 999999. Late registration will terminate early if payouts begin or the tournament fills up (max entrants = tables * seats per table)."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Late penalty:</td>
                        <td><Field className="stretch" type="text" name={"LatePenalty"}
                                   placeholder={props.EditMessag.Object.LatePenalty}
                                   component={'input'} className={style.form_input}
                                   title="Set the number of chips to deduct from the starting stack of a late registration player. Use a negative number to represent a per-minute late penalty."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Minimum players:</td>
                        <td><Field className="stretch" type="text" name={"MinPlayers"}
                                   placeholder={props.EditMessag.Object.MinPlayers}
                                   component={'input'} className={style.form_input}
                                   title="This is the minimum number of players (2 to 1000) that must be registered to auto start the tournament at a set time. This feature is ignored when the Start Time setting is 0000-00-00 00:00."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Recur minutes:</td>
                        <td><Field className="stretch" type="text" name={"RecurMinutes"}
                                   placeholder={props.EditMessag.Object.RecurMinutes}
                                   component={'input'} className={style.form_input}
                                   title="Enter the number of minutes (0 to 999999) to add to the Start Time for an auto-recurring tournament. Reference: 1440 = 1 day, 10080 = 1 week."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Reset seconds:</td>
                        <td><Field className="stretch" type="text" name={"ResetSeconds"}
                                   placeholder={props.EditMessag.Object.ResetSeconds}
                                   component={'input'} className={style.form_input}
                                   title="Enter the number of seconds (10 to 999999, default 30) after the tournament completes before clearing the results and resetting for the next one."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Maximum runs:</td>
                        <td><Field className="stretch" type="text" name={"MaxRuns"}
                                   placeholder={props.EditMessag.Object.MaxRuns} component={'input'} className={style.form_input}
                                   title="Enter the maximum number of times this tournament can run before it is automatically taken offline. The count resets each time the tournament is put online. Enter 0 (the default) to disable this feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>No-shows minutes:</td>
                        <td><Field className="stretch" type="text" name={"NoShowMinutes"}
                                   placeholder={props.EditMessag.Object.NoShowMinutes}
                                   component={'input'} className={style.form_input}
                                   title="Specify the number of minutes at which no-show players (never clicked their ready button) are removed from the tournament. Enter 0 to disable this feature. Buy-ins are refunded so best used only for freeroll tournaments."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Primary currency:</td>
                        <td><Field className="stretch" name={"PrimaryCurrency"} component={'select'} className={style.form_select}
                                   title="Select Yes for primary (Balance) or No for secondary (Balance2) funding of the buy-ins, rebuys, and payouts. Secondary currency is only supported in the Gold edition.">
                            <option>{props.EditMessag.Object.PrimaryCurrency}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Buy-in:</td>
                        <td><Field className="stretch" type="text" name={"BuyIn"}
                                   placeholder={props.EditMessag.Object.BuyIn} component={'input'} className={style.form_input}
                                   title="Select the buy-in for this tournament. The default value is 1500. The buy-in does not include the entry fee."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Bounty:</td>
                        <td><Field className="stretch" type="text" name={"Bounty"}
                                   placeholder={props.EditMessag.Object.Bounty} component={'input'} className={style.form_input}
                                   title="Select a portion of the buy-in to be set aside for each knockout bounty. This amount is deducted from the main prize pool and is awarded directly to a player each time they eliminate another player from the tournament."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Entry Fee:</td>
                        <td><Field className="stretch" type="text" name={"EntryFee"}
                                   placeholder={props.EditMessag.Object.EntryFee} component={'input'} className={style.form_input}
                                   title="Select an entry fee for this tournament. This amount is added to the buy-in but is kept by the &quot;house&quot; and does not go into the prize pool. Pro/Gold feature. Must be 0 for Lite/Trial version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Ticket:</td>
                        <td><Field className="stretch" type="text" name={"Ticket"}
                                   placeholder={props.EditMessag.Object.Ticket} component={'input'} className={style.form_input}
                                   title="Set an optional ticket token (15 alphanumeric chars max) that can be used in place of (or in addition to) the regular buy-in (typically won as a prize from an earlier tournament)."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Ticket required:</td>
                        <td><Field className="stretch" name={"TicketRequired"} component={'select'} className={style.form_select}
                                   title="Select Yes and only players with a matching ticket may enter this tournament. Otherwise select No and non-ticketed players can just pay the buy-in.">
                            <option>{props.EditMessag.Object.TicketRequired} </option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Ticket funded:</td>
                        <td><Field className="stretch" name={"TicketFunded"} component={'select'} className={style.form_select}
                                   title="Select Yes and the house will pay the buy-in and bounty for players with tickets. Select No and players will pay their own way if tickets are required. If required and funded are both No then ticketed players enter for free and do not increase the prizepool.">
                            <option>{props.EditMessag.Object.TicketFunded}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Prize bonus:</td>
                        <td><Field className="stretch" type="text" name={"PrizeBonus"}
                                   placeholder={props.EditMessag.Object.PrizeBonus}
                                   component={'input'} className={style.form_input}
                                   title="This is the number of house chips that are added to the prize pool. The amount can be a single sum, a per entrant amount, or a guaranteed minimum prizepool, depending on the Multiply Bonus setting. The default value is 0."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Multiply bonus:</td>
                        <td><Field className="stretch" name={"MultiplyBonus"} component={'select'} className={style.form_select}
                                   title="Set to Yes to multiply the prize bonus by the number of entrants. Set to No to add the prize bonus as-is. Set to Min to treat the prize bonus as a guaranteed minimum prize pool.">
                            <option>{props.EditMessag.Object.MultiplyBonus}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                            <option value="Min">Min</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Starting chips:</td>
                        <td><Field className="stretch" type="text" name={"StartingChips"}
                                   placeholder={props.EditMessag.Object.StartingChips}
                                   component={'input'} className={style.form_input}
                                   title="Set the number of starting chips for each player, from 10 to 25000 chips. The default value is 1500."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Bonus ticket:</td>
                        <td><Field className="stretch" type="text" name={"BonusTicket"}
                                   placeholder={props.EditMessag.Object.BonusTicket}
                                   component={'input'} className={style.form_input}
                                   title="Set an optional bonus ticket prefix to add extra starting chips. For example, if set to &quot;Bonus&quot;, a player holding a ticket named &quot;Bonus100&quot; will get an extra 100 chips added to their starting stack."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Add-on chips:</td>
                        <td><Field className="stretch" type="text" name={"AddOnChips"}
                                   placeholder={props.EditMessag.Object.AddOnChips}
                                   component={'input'} className={style.form_input}
                                   title="Set the number of add-on chips (50000 max) to be offered at the end of the rebuy period for the same price as a regular rebuy. Use 0 for no add-on."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Turn clock:</td>
                        <td><Field className="stretch" type="text" name={"TurnClock"}
                                   placeholder={props.EditMessag.Object.TurnClock}
                                   component={'input'} className={style.form_input}
                                   title="This is the number of seconds (10 to 120) that the player has to act on each turn. The default value is 30."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Turn warning:</td>
                        <td><Field className="stretch" type="text" name={"TurnWarning"}
                                   placeholder={props.EditMessag.Object.TurnWarning}
                                   component={'input'} className={style.form_input}
                                   title="This is number of seconds remaining (5 to 119) on the turn clock when a warning is sent to the player and (if sync is enabled) their time bank button appears. The default value is 10."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Time bank:</td>
                        <td><Field className="stretch" type="text" name={"BankClock"}
                                   placeholder={props.EditMessag.Object.BankClock}
                                   component={'input'} className={style.form_input}
                                   title="This is a reserve of time (0 to 600 seconds) available to each player on request and via disconnect detection. The default value is 60."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Time bank sync:</td>
                        <td><Field className="stretch" name={"BankSync"} component={'select'} className={style.form_select}
                                   title="Select Yes (the default) to show the time bank button with the turn warning. Select No to show the time bank button immediately.">
                            <option>{props.EditMessag.Object.BankSync}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Time bank reset:</td>
                        <td><Field className="stretch" type="text" name={"BankReset"}
                                   placeholder={props.EditMessag.Object.BankReset}
                                   component={'input'} className={style.form_input}
                                   title="This is the number of hands that must be played before a player's time bank is automatically refilled. Use 0 to disable the reset feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Disconnect protection:</td>
                        <td><Field className="stretch" name={"DisProtect"} component={'select'} className={style.form_select}
                                   title="Select Yes to automatically activate a player's time bank if they disconnect during their turn and run out of normal time.">
                            <option>{props.EditMessag.Object.DisProtect}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Level duration:</td>
                        <td><Field className="stretch" type="text" name={"LevelDuration"}
                                   placeholder={props.EditMessag.Object.Level}
                                   component={'input'} className={style.form_input}
                                   title="This is the number of minutes (1 to 1000) in each blinds level. The default value is 10."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rebuy levels:</td>
                        <td><Field className="stretch" type="text" name={"RebuyLevels"}
                                   placeholder={props.EditMessag.Object.RebuyLevels}
                                   component={'input'} className={style.form_input}
                                   title="Set the length of the rebuy period in levels (1000 max). Enter 0 for a freezeout (non-rebuy) tournament. See details in the help file."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rebuy threshold:</td>
                        <td><Field className="stretch" type="text" name={"Threshold"}
                                   placeholder={props.EditMessag.Object.Threshold}
                                   component={'input'} className={style.form_input}
                                   title="This is the maximum number of chips that a player can have to request a rebuy. Typically this is the same as the Starting Chips value."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Maximum rebuys:</td>
                        <td><Field className="stretch" type="text" name={"MaxRebuys"}
                                   placeholder={props.EditMessag.Object.MaxRebuys}
                                   component={'input'} className={style.form_input}
                                   title="Set the maximum number of rebuys that each player can make during the rebuy period. Enter -1 for unlimited rebuys."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rebuy cost:</td>
                        <td><Field className="stretch" type="text" name={"RebuyCost"}
                                   placeholder={props.EditMessag.Object.RebuyCost}
                                   component={'input'} className={style.form_input}
                                   title="This amount is deducted from the player's account and added to the prize pool for each rebuy and add-on. Typically it is equal to the Buy-In amount."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rebuy fee:</td>
                        <td><Field className="stretch" type="text" name={"RebuyFee"}
                                   placeholder={props.EditMessag.Object.RebuyFee} component={'input'} className={style.form_input}
                                   title="This amount is deducted from the player's account and added to the house account for each rebuy and add-on. Typically it is equal to 0. Pro/Gold feature. Must be 0 for Lite/Trial version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Break time:</td>
                        <td><Field className="stretch" type="text" name={"BreakTime"}
                                   placeholder={props.EditMessag.Object.BreakTime}
                                   component={'input'} className={style.form_input}
                                   title="This is the number of minutes in each rest break, 0 to 60. Use 0 for no rest breaks."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Break interval:</td>
                        <td><Field className="stretch" type="text" name={"BreakInterval"}
                                   placeholder={props.EditMessag.Object.BreakInterval}
                                   component={'input'} className={style.form_input}
                                   title="Depending on the Break Sync setting, this is either the minutes past the hour (0 to 59) or the number of levels between breaks (1 to 1000)."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Break sync:</td>
                        <td><Field className="stretch" name={"BreakSync"} component={'select'} className={style.form_select}
                                   title="Set to Yes to synchronize rest breaks with the system clock where Break Interval represents minutes past each hour for the break start time. Set to No run breaks after each set number of levels as specified in the Break Interval setting.">
                            <option>{props.EditMessag.Object.BreakSync}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Stop on chop:</td>
                        <td><Field className="stretch" name={"StopOnChop"} component={'select'} className={style.form_select}
                                   title="Set this option to Yes to stop a tournament early if the remaining players are all due an equal payout (or an equal ticket if there are no payouts).">
                            <option>{props.EditMessag.Object.StopOnChop}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Proportional chop:</td>
                        <td><Field className="stretch" type="text" name={"PropChop"}
                                   placeholder={props.EditMessag.Object.PropChop} component={'input'} className={style.form_input}
                                   title="Set from 0 to 100, representing the percentage of the prizepool that will be paid out proportionally (based on chip counts) when Stop On Chop is enabled. If less than 100, the remainder of the prizepool is divided equally."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Bring-in percent:</td>
                        <td><Field className="stretch" type="text" name={"BringInPercent"}
                                   placeholder={props.EditMessag.Object.BringInPercent}
                                   component={'input'} className={style.form_input}
                                   title="This is the &quot;Bring In&quot; amount for Stud and Razz games, expressed as a percentage of the Small Bet (1 to 99). The default value is 30."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Blinds schedule:</td>
                        <td><Field className="stretch" type="text" name={"Blinds"} component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.Blinds}
                                   value="10/20/0, 15/30/0, 25/50/0, 50/100/0, 75/150/0, 100/200/0, 100/200/25, 200/400/25, 300/600/50, 400/800/50, 600/1200/75, 800/1600/75, 1000/2000/100, 1500/3000/150, 2000/4000/200, 3000/6000/300, 4000/8000/400, 6000/12000/600, 8000/16000/800, 10000/20000/1000, 15000/30000/1500, 20000/40000/2000, 25000/50000/2500, 35000/70000/3500, 45000/90000/4500, 55000/110000/5500, 70000/140000/7000, 85000/170000/8500, 100000/200000/10000, 125000/250000/12500"
                                   title="Edit the values in this list to specify a schedule of increasing blinds and antes for the tournament. When a Limit game is selected, the small and big bets are calculated automatically. Stud/Razz games use only the ante and bet values."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Payout structure:</td>
                        <td><Field className="stretch" type="text" name={"Payout"} component={'input'} className={style.form_input}
                                   placeholder={props.EditMessag.Object.Payout}
                                   value="2-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00|11-20, 45.00, 28.00, 17.00, 10.00|21-40, 36.00, 23.00, 15.00, 11.00, 8.00, 7.00|41-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30"
                                   title="Edit the values in this list to specify a structure of comma-separated payout percentages (beginning with 1st place) for various ranges of entrants (2 to 1000). The Paid and Total columns are calculated automatically."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Payout fractions:</td>
                        <td>
                            <Field className="stretch" name={"PayoutFractions"} component={'select'} className={style.form_select}
                                   title="Set to Yes (the default) to allow payouts in 0.01 chip multiples or No for whole number chip multiples.">
                                <option>{props.EditMessag.Object.PayoutFractions}</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Field>
                        </td>
                    </tr>
                    <tr>
                        <td>Payout tickets:</td>
                        <td><Field className="stretch" type="text" name={"PayoutTickets"}
                                   placeholder={props.EditMessag.Object.PayoutTickets}
                                   component={'input'} className={style.form_input}
                                   title="This is an optional comma-separated list of tickets to pay out, starting with first place. Typically used in satellite tournaments so that winners can use ticket as entry into next level."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Unregister at logout:</td>
                        <td><Field className="stretch" name={"UnregLogout"} component={'select'} className={style.form_select}
                                   title="When set to Yes, players will be unregistered from the tournament if they log out before it starts.">
                            <option>{props.EditMessag.Object.UnregLogout}</option>
                            <option value="Yes">Yes</option>
                            <option value="No" selected="">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Table graphic:</td>
                        <td><Field className="stretch" type="text" name={"TableGraphic"}
                                   placeholder={props.EditMessag.Object.TableGraphic}
                                   component={'input'} className={style.form_input}
                                   title="Pro/Gold feature. Enter the full path of a local image file (700 x 510 GIF, PNG or JPG format) to use as the table graphic. Leave this value blank to use the default system graphic."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Final table graphic:</td>
                        <td><Field className="stretch" type="text" name={"TableGraphicFinal"}
                                   placeholder={props.EditMessag.Object.TableGraphicFinal}
                                   component={'input'} className={style.form_input}
                                   title="Pro/Gold feature. Enter the full path of a local image file (700 x 510 GIF, PNG or JPG format) to use as the final table graphic (if tournament is multi-table). Leave this value blank to use the regular table graphic at the final table."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Note:</td>
                        <td><Field className="stretch" type="text" name={"Note"}
                                   placeholder={props.EditMessag.Object.Note} component={'input'} className={style.form_input}
                                   title="This is an optional note field, not seen by the players. 500 characters maximum."/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" height="60" align="center">
                            {/*<Field type="button" value="Ok" onClick="send('RGSaveAdd')" component={"button"}/> */}
                            <button className={style.button}>
                                Ok
                            </button>
                            &nbsp;
                            {/*<NavLink to="/ringgames">*/}
                            {/*    <span>Cancel</span>*/}
                            {/*</NavLink>*/}
                            <NavLink to='/tournaments'><Button variant="contained" color="primary">
                                Return
                            </Button></NavLink>
                            {props.EditMessag.Error !== '' ? <h3 style={{color: 'red'}}>{props.EditMessag.Error === '' ?
                                <CircularProgress/> : props.EditMessag.Error}</h3>
                                : <h3 style={{color: 'green'}}>{props.EditMessag.Result}</h3>}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
const afterSubmit = (result, dispatch) => {
    dispatch(reset('edittableTournaments'));
}
let ContactFormTournamentsEdit = reduxForm({
    form: 'edittableTournaments',
    onSubmitSuccess: afterSubmit,
})(FormEditTournaments);
function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let a = `Tournament ${result}`
    return a;
}
const EditTournaments = (props) => {
    const onSubmit = (values) => {
        let args = [
            values.GameID === undefined ? props.EditMessag.Object.Name : values.GameID,
            values.Description === undefined ? '' : values.Description,
            values.AutoStart === undefined ? 'Yes' : values.AutoStart,
            values.GameType === undefined ? 'No Limit Hold\'em' : values.GameType,
            values.MixedList === undefined ? '' : values.MixedList,
            values.Shootout === undefined ? '' : values.Shootout,
            values.Password === undefined ? '' : values.Password,
            values.Private === undefined ? 'No' : values.Private,
            values.PermRegister === undefined ? '' : values.PermRegister,
            values.PermUnregister === undefined ? '' : values.PermUnregister,
            values.PermObserve === undefined ? '' : values.PermObserve,
            values.PermPlayerChat === undefined ? '' : values.PermPlayerChat,
            values.PermObserverChat === undefined ? '' : values.PermObserverChat,
            values.SuspendChatAllIn === undefined ? 'No' : values.SuspendChatAllIn,
            values.Tables === undefined ? '1' : values.Tables,
            values.Seats === undefined ? '9' : values.Seats,
            values.StartFull === undefined ? 'No' : values.StartFull,
            values.StartMin === undefined ? '0' : values.StartMin,
            values.StartCode === undefined ? '0' : values.StartCode,
            values.StartTime === undefined ? '0000-00-00 00:00' : values.StartTime,
            values.RegMinutes === undefined ? '0' : values.RegMinutes,
            values.LateRegMinutes === undefined ? '0' : values.LateRegMinutes,
            values.LatePenalty === undefined ? '0' : values.LatePenalty,
            values.MinPlayers === undefined ? '2' : values.MinPlayers,
            values.RecurMinutes === undefined ? '0' : values.RecurMinutes,
            values.ResetSeconds === undefined ? '30' : values.ResetSeconds,
            values.MaxRuns === undefined ? '0' : values.MaxRuns,
            values.NoShowMinutes === undefined ? '0' : values.NoShowMinutes,
            values.PrimaryCurrency === undefined ? 'Yes' : values.PrimaryCurrency,
            values.BuyIn === undefined ? '1500' : values.BuyIn,
            values.Bounty === undefined ? '0' : values.Bounty,
            values.EntryFee === undefined ? '0' : values.EntryFee,
            values.Ticket === undefined ? '' : values.Ticket,
            values.TicketRequired === undefined ? 'No' : values.TicketRequired,
            values.TicketFunded === undefined ? 'No' : values.TicketFunded,
            values.PrizeBonus === undefined ? '0' : values.PrizeBonus,
            values.MultiplyBonus === undefined ? 'No' : values.MultiplyBonus,
            values.StartingChips === undefined ? '1500' : values.StartingChips,
            values.BonusTicket === undefined ? '' : values.BonusTicket,
            values.AddOnChips === undefined ? '0' : values.AddOnChips,
            values.TurnClock === undefined ? '30' : values.TurnClock,
            values.TurnWarning === undefined ? '10' : values.TurnWarning,
            values.BankClock === undefined ? '60' : values.BankClock,
            values.BankSync === undefined ? 'Yes' : values.BankSync,
            values.BankReset === undefined ? '0' : values.BankReset,
            values.DisProtect === undefined ? 'Yes' : values.DisProtect,
            values.LevelDuration === undefined ? '10' : values.LevelDuration,
            values.RebuyLevels === undefined ? '0' : values.RebuyLevels,
            values.Threshold === undefined ? '1500' : values.Threshold,
            values.MaxRebuys === undefined ? '0' : values.MaxRebuys,
            values.RebuyCost === undefined ? '0' : values.RebuyCost,
            values.RebuyFee === undefined ? '0' : values.RebuyFee,
            values.BreakTime === undefined ? '0' : values.BreakTime,
            values.BreakInterval === undefined ? '6' : values.BreakInterval,
            values.BreakSync === undefined ? '0' : values.BreakSync,
            values.StopOnChop === undefined ? '0' : values.StopOnChop,
            values.PropChop === undefined ? '0' : values.PropChop,
            values.BringInPercent === undefined ? '30' : values.BringInPercent,
            values.Blinds === undefined ? '10/20/0, 15/30/0, 25/50/0, 50/100/0, 75/150/0, 100/200/0, 100/200/25, 200/400/25, 300/600/50, 400/800/50, 600/1200/75, 800/1600/75, 1000/2000/100, 1500/3000/150, 2000/4000/200, 3000/6000/300, 4000/8000/400, 6000/12000/600, 8000/16000/800, 10000/20000/1000, 15000/30000/1500, 20000/40000/2000, 25000/50000/2500, 35000/70000/3500, 45000/90000/4500, 55000/110000/5500, 70000/140000/7000, 85000/170000/8500, 100000/200000/10000, 125000/250000/12500' : values.Blinds,
            values.Payout === undefined ? '2-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00|11-20, 45.00, 28.00, 17.00, 10.00|21-40, 36.00, 23.00, 15.00, 11.00, 8.00, 7.00|41-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30' : values.Payout,
            values.PayoutFractions === undefined ? 'Yes' : values.PayoutFractions,
            values.PayoutTickets === undefined ? '' : values.PayoutTickets,
            values.UnregLogout === undefined ? 'No' : values.UnregLogout,
            values.TableGraphic === undefined ? '' : values.TableGraphic,
            values.TableGraphicFinal === undefined ? '' : values.TableGraphicFinal,
            values.Note === undefined ? '' : values.Note,
            values.on1 === true ? "Limit Hold'em," : '',
            values.on2 === true ? "Pot Limit Hold'em," : '',
            values.on3 === true ? "No Limit Hold'em," : '',
            values.on4 === true ? "Limit Omaha," : '',
            values.on5 === true ? "Pot Limit Omaha," : '',
            values.on6 === true ? "No Limit Omaha," : '',
            values.on7 === true ? "Limit Omaha Hi-Lo," : '',
            values.on8 === true ? "Pot Limit Omaha Hi-Lo," : '',
            values.on9 === true ? "No Limit Omaha Hi-Lo," : '',
            values.on10 === true ? "Limit Omaha-5," : '',
            values.on11 === true ? "Pot Limit Omaha-5," : '',
            values.on12 === true ? "No Limit Omaha-5," : '',
            values.on13 === true ? "Limit Omaha-5 Hi-Lo," : '',
            values.on14 === true ? "Pot Limit Omaha-5 Hi-Lo," : '',
            values.on15 === true ? "No Limit Omaha-5 Hi-Lo," : '',
            values.on16 === true ? "Limit Razz," : '',
            values.on17 === true ? "Limit Stud," : '',
            values.on18 === true ? "Limit Stud Hi-Lo," : '',
        ];
        props.editTournamentsThunk(args);
    }
    return <div>
        <ContactFormTournamentsEdit mixedThunk={props.mixedThunk} {...props} onSubmit={onSubmit}/>
    </div>
}
export default EditTournaments;
