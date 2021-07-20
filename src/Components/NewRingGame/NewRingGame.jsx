import React from "react";
import style from './NewRingGame.module.css';
import {Field, reduxForm, reset} from "redux-form";
import {NavLink} from "react-router-dom";
import {myInputs, mySelected} from "../../forinput/newinput";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Button} from "@material-ui/core";
import styled, {keyframes} from "styled-components";
import {zoomIn} from "react-animations";
import {mixedRingGamesThunk} from "../../Reducer/addtable-reducer";
const Bounce = styled.div`animation: 0.5s ${keyframes`${zoomIn}`} ease-out`;
const FormAddTable = (props) => {
    let adValueFromSel = (value) => {
        if (value === 'Mixed') {
            props.mixedRingGamesThunk(value);
        }
        props.mixedRingGamesThunk(value);
    }
    return (
        <div>
            <form onSubmit={props.handleSubmit} style={{marginTop: '20px'}}>
                <table className={style.table_new_ringgame}>
                    <tbody>
                    <tr>
                        <th colSpan="2"><h2>Create Table</h2></th>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td><Field type="text" name={"GameID"} component={"input"} className={style.form_input}
                                   title="Specify a unique table name, up to 40 characters."/></td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td><Field type="text" component={"input"} className={style.form_input} name={"Description"}
                                   title="This is an optional description, up to 500 characters. It is displayed at the top of the table's information window and may include HTML tags, including links. See help file for details."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Auto online:</td>
                        <td><Field name={"AutoStart"} component={"select"} className={style.form_select} required
                                   title="When this option is set to Yes, the ring game will be put online when the game server is started. Otherwise tables must be manually put online with the Action button.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Game:</td>
                        <td><Field name={"GameType"} component={"select"} className={style.form_select} required
                                   onChange={(event) => adValueFromSel(event.target.value)}
                                   title="Select a Hold'em, Omaha, Omaha-5, Razz, 7-Card Stud, or Mixed game. When Mixed is selected, fill in the Mixed field also. Only Limit games are available in the Trial Version.">
                            <option selected>Choose a game</option>
                            <option value="Limit Hold'em">Limit Hold'em</option>
                            <option value="Pot Limit Hold'em">Pot Limit Hold'em</option>
                            <option value="No Limit Hold'em" selected="">No Limit Hold'em</option>
                            <option value="Cap Limit Hold'em">Cap Limit Hold'em</option>
                            <option value="Limit Omaha">Limit Omaha</option>
                            <option value="Pot Limit Omaha">Pot Limit Omaha</option>
                            <option value="No Limit Omaha">No Limit Omaha</option>
                            <option value="Cap Limit Omaha">Cap Limit Omaha</option>
                            <option value="Limit Omaha Hi-Lo">Limit Omaha Hi-Lo</option>
                            <option value="Pot Limit Omaha Hi-Lo">Pot Limit Omaha Hi-Lo</option>
                            <option value="No Limit Omaha Hi-Lo">No Limit Omaha Hi-Lo</option>
                            <option value="Cap Limit Omaha Hi-Lo">Cap Limit Omaha Hi-Lo</option>
                            <option value="Limit Omaha-5">Limit Omaha-5</option>
                            <option value="Pot Limit Omaha-5">Pot Limit Omaha-5</option>
                            <option value="No Limit Omaha-5">No Limit Omaha-5</option>
                            <option value="Cap Limit Omaha-5">Cap Limit Omaha-5</option>
                            <option value="Limit Omaha-5 Hi-Lo">Limit Omaha-5 Hi-Lo</option>
                            <option value="Pot Limit Omaha-5 Hi-Lo">Pot Limit Omaha-5 Hi-Lo</option>
                            <option value="No Limit Omaha-5 Hi-Lo">No Limit Omaha-5 Hi-Lo</option>
                            <option value="Cap Limit Omaha-5 Hi-Lo">Cap Limit Omaha-5 Hi-Lo</option>
                            <option value="Limit Razz">Limit Razz</option>
                            <option value="Limit Stud">Limit Stud</option>
                            <option value="Limit Stud Hi-Lo">Limit Stud Hi-Lo</option>
                            <option value="Mixed">Mixed</option>
                        </Field></td>
                    </tr>
                    {props.mixed === 'Mixed' ? <tr>
                        <td>Mixed:</td>
                        {/*<td>Limit Razz: <Field className="stretch" type="checkbox" name={"MixedList1"} value="" component={'input'}*/}
                        {/*           title="Select a list of games when Game type is set to Mixed, otherwise leave blank. Each game is played for a full level and the list loops indefinitely."/>*/}
                        <td>
                            <Bounce><Field type="checkbox" component={'input'} name={"on1"}/>Limit
                                Hold'em<br></br>
                                <Field type="checkbox" component={'input'} name={"on2"}/>Pot Limit
                                Hold'em <br></br>
                                <Field type="checkbox" component={'input'} name={"on3"}/>No Limit
                                Hold'em<br></br>
                                <Field type="checkbox" component={'input'} name={"on4"}/>Limit Omaha<br></br>
                                <Field type="checkbox" component={'input'} name={"on5"}/>Pot Limit
                                Omaha<br></br>
                                <Field type="checkbox" component={'input'} name={"on6"}/>No Limit
                                Omaha<br></br>
                                <Field type="checkbox" component={'input'} name={"on7"}/>Limit Omaha
                                Hi-Lo<br></br>
                                <Field type="checkbox" component={'input'} name={"on8"}/>Pot Limit
                                Omaha
                                Hi-Lo<br></br>
                                <Field type="checkbox" component={'input'} name={"on9"}/>No Limit Omaha
                                Hi-Lo<br></br>
                                <Field type="checkbox" component={'input'} name={"on10"}/>Limit
                                Omaha-5<br></br>
                                <Field type="checkbox" component={'input'} name={"on11"}/>Pot Limit
                                Omaha-5<br></br>
                                <Field type="checkbox" component={'input'} name={"on12"}/>No Limit
                                Omaha-5<br></br>
                                <Field type="checkbox" component={'input'} name={"on13"}/>Limit Omaha-5
                                Hi-Lo<br></br>
                                <Field type="checkbox" component={'input'} name={"on14"}/>Pot Limit
                                Omaha-5 Hi-Lo<br></br>
                                <Field type="checkbox" component={'input'} name={"on15"}/>No Limit
                                Omaha-5
                                Hi-Lo<br></br>
                                <Field type="checkbox" component={'input'} name={"on16"}/>Limit Razz<br></br>
                                <Field type="checkbox" component={'input'} name={"on17"}/>Limit Stud<br></br>
                                <Field type="checkbox" component={'input'} name={"on18"}/>Limit Stud
                                Hi-Lo<br></br></Bounce>
                        </td>
                    </tr> : ''}
                    {/*<tr>*/}
                    {/*    <td>Mixed:</td>*/}
                    {/*    <td><Field type="text" name={"MixedList"} component={"input"} className={style.form_input}*/}
                    {/*               title="Select a list of games when Game type is set to Mixed, otherwise leave blank. Each game is played for the duration set by &quot;Mixed hands&quot; and the list loops indefinitely."/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td>Mixed hands:</td>
                        <td><Field type="text" name={"MixedHands"} component={"input"} className={style.form_input}
                                   placeholder="0"
                                   title="Number of hands per game when Game type is set to Mixed, 1 to 1000. Or set to 0 to use the seat count."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><Field type="text" name={"Password"} value="" component={"input"}
                                   className={style.form_input}
                                   title="Specify a password needed to take a seat at the table or leave this field blank for an open table. You can also use the play permission to restrict play to specific players."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Private:</td>
                        <td><Field name={"Private"} component={"select"} className={style.form_select} required
                                   title="If a password is set for the table, select Yes to make it completely private or select No to allow observers to watch. You can also use the observe permission to restrict observers.">
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Play permission:</td>
                        <td><Field type="text" name={"PermPlay"} value="" component={"input"}
                                   className={style.form_input}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict play to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the password setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Observe permission:</td>
                        <td><Field type="text" name={"PermObserve"} value="" component={"input"}
                                   className={style.form_input}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict observing to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the private setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Player chat permission:</td>
                        <td><Field type="text" name={"PermPlayerChat"} value="" component={"input"}
                                   className={style.form_input}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict table chat to players who have the same token. Prefix with a dash (-) to only exclude players who have the token. Leave blank to allow chat from all seated players."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Observer chat permission:</td>
                        <td><Field type="text" name={"PermObserverChat"} value="" component={"input"}
                                   className={style.form_input}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict table chat to observers who have the same token. Prefix with a dash (-) to only exclude players who have the token. Leave blank to allow chat from all observers."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Suspend chat all-in:</td>
                        <td><select name={"SuspendChatAllIn"} component={"select"} className={style.form_select}
                                    required
                                    title="Select Yes to suspend the table chat when any player has an all-in bet.">
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td>Seats:</td>
                        <td><Field type="text" name={"Seats"} placeholder="9" component={"input"}
                                   className={style.form_input}
                                   title="Select the number of seats available at this table, from 2 to 10 (8 max for Stud or Razz)."/>
                        </td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <td>Start minimum:</td>*/}
                    {/*    <td><Field type="text" name={"StartMin"} value="2" component={"input"} className={style.form_input}*/}
                    {/*               title="Select the minimum number of ready players needed to start a new session."/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>Start code:</td>*/}
                    {/*    <td><Field type="text" name={"StartCode"} value="0" component={"input"} className={style.form_input}*/}
                    {/*               title="This is a code (1 to 999999) that can be entered in the Lobby window (Options menu) to start a game that has not met the Start Minimum requirement. Enter 0 to disable this feature."/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td>Primary currency:</td>
                        <td><Field name={"PrimaryCurrency"} component={"select"} className={style.form_select} required
                                   title="Select Yes for primary (Balance) or No for secondary (Balance2) funding of the buy-ins. Secondary currency is only supported in the Gold edition.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Smallest chip:</td>
                        <td><Field name={"SmallestChip"} component={"select"} className={style.form_select} required
                                   title="Select the denomination of the smallest chip allowed at this table. Buy-in, rake, blinds, and player bets must all be a multiple of this value.">
                            <option value="0.01" selected="">0.01</option>
                            <option value="0.05">0.05</option>
                            <option value="0.25">0.25</option>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="25">25</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="5000">5000</option>
                            <option value="25000">25000</option>
                            <option value="100000">100000</option>
                            <option value="500000">500000</option>
                            <option value="1000000">1000000</option>
                            <option value="5000000">5000000</option>
                            <option value="25000000">25000000</option>
                            <option value="100000000">100000000</option>
                            <option value="500000000">500000000</option>
                            <option value="1000000000">1000000000</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Minimum buy-in:</td>
                        <td><Field type="text" name={"BuyInMin"} component={"input"} className={style.form_input}
                                   placeholder="400"
                                   title="Select the minimum buy-in for this table. The default value is 400."/></td>
                    </tr>
                    <tr>
                        <td>Maximum buy-in:</td>
                        <td><Field type="text" name={"BuyInMax"} placeholder="2000" component={"input"}
                                   className={style.form_input}
                                   title="Select the maximum buy-in for this table. The default value is 2000."/></td>
                    </tr>
                    <tr>
                        <td>Default buy-in:</td>
                        <td><Field type="text" name={"BuyInDef"} value="1200" component={"input"}
                                   className={style.form_input} placeholder="1200"
                                   title="Select the default buy-in for this table. The default value is 1200."/></td>
                    </tr>
                    <tr>
                        <td>Cap limit:</td>
                        <td><Field type="text" name={"CapLimit"} value="0" component={"input"}
                                   className={style.form_input} placeholder="0"
                                   title="Cap limit for CL games, typically set at 20 to 40 times the big blind. This setting is not used in Limit/NL/PL games."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rake percent:</td>
                        <td><Field type="text" name={"RakePercent"} value="0" component={"input"}
                                   className={style.form_input} placeholder="0"
                                   title="Enter the percentage of chips from each pot that will be raked into the house rake account. This is a Pro/Gold version feature. Set to 0 for the Trial/Lite version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rake cap:</td>
                        <td><Field type="text" name={"RakeCap"} value="0" component={"input"}
                                   className={style.form_input} placeholder="0"
                                   title="Enter the maximum number of chips that can be raked in a single hand. Set to 0 for no cap limit. This is a Pro/Gold version feature. Set to 0 for the Trial/Lite version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Turn clock:</td>
                        <td><Field type="text" name={"TurnClock"} value="30" component={"input"}
                                   className={style.form_input} placeholder="30"
                                   title="This is the number of seconds (10 to 120) that the player has to act on each turn. The default value is 30."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Turn warning:</td>
                        <td><Field type="text" name={"TurnWarning"} value="10" component={"input"}
                                   className={style.form_input} placeholder="10"
                                   title="This is number of seconds remaining (5 to 119) on the turn clock when a warning is sent to the player and (if sync enabled) their time bank button appears. The default value is 10."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Time bank:</td>
                        <td><Field type="text" name="BankClock" value="60" component={"input"}
                                   className={style.form_input} placeholder="60"
                                   title="This is a reserve of time (0 to 600 seconds) available to each player on request and via disconnect detection. The default value is 60."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Time bank sync:</td>
                        <td><Field name={"BankSync"} component={"select"} className={style.form_select} required
                                   title="Select Yes (the default) to show the time bank button with the turn warning. Select No to show the time bank button immediately.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Time bank reset:</td>
                        <td><Field type="text" name={"BankReset"} value="0" component={"input"}
                                   className={style.form_input} placeholder="0"
                                   title="This is the number of hands that must be played before a player's time bank is automatically refilled. Use 0 to disable the reset feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Disconnect protection:</td>
                        <td><Field name={"DisProtect"} component={"select"} className={style.form_select} required
                                   title="Select Yes to automatically activate a player's time bank if they disconnect during their turn and run out of normal time.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Small blind:</td>
                        <td><Field type="text" name={"SmallBlind"} value="10" component={"input"}
                                   className={style.form_input} placeholder="10"
                                   title="This is the Small Blind setting. It is only used in Pot Limit and No Limit games. The default value is 10. In Limit games, the Small Blind is half the Small Bet setting."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Big blind:</td>
                        <td><Field type="text" name={"BigBlind"} value="20" component={"input"}
                                   className={style.form_input} placeholder="20"
                                   title="This is the Big Blind setting. It is only used in Pot Limit and No Limit games. The default value is 20. In Limit games, the Big Blind is equal to the Small Bet setting."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Allow straddle:</td>
                        <td><Field name={"AllowStraddle"} component={"select"} className={style.form_select} required
                                   title="Set to Yes to give the Under-The-Gun player the option to post a straddle bet (twice the big blind) before the cards are dealt in Hold'em and Omaha games. The default value is &quot;No&quot;.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Small bet:</td>
                        <td><Field type="text" name={"SmallBet"} value="20" component={"input"}
                                   className={style.form_input} placeholder="20"
                                   title="This is the Small Bet setting. It is only used in Limit games and also determines the blinds in Limit games that use blinds."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Big bet:</td>
                        <td><Field type="text" name={"BigBet"} value="40" component={"input"}
                                   className={style.form_input} placeholder="40"
                                   title="This is the Big Bet setting. It is only used in Limit games."/></td>
                    </tr>
                    <tr>
                        <td>Ante:</td>
                        <td><Field type="text" name={"Ante"} value="0" component={"input"} className={style.form_input}
                                   placeholder="0"
                                   title="This is the ante. Normally not used in Hold'em and Omaha unless &quot;Ante all&quot; is also enabled."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Ante all:</td>
                        <td><Field name={"AnteAll"} component={"select"} className={style.form_select} required
                                   title="Set to Yes to collect an ante for all games. Set to No (the default) to only collect an ante in Razz and Stud games.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Bring-in:</td>
                        <td><Field type="text" name={"BringIn"} value="0" component={"input"}
                                   className={style.form_input} placeholder="0"
                                   title="This is the bring-in. It is only used in Stud and Razz games and is typically no more than half the Small Bet value."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Allow duplicate IPs:</td>
                        <td><Field name={"AllowDupeIPs"} component={"select"} className={style.form_select} required
                                   title="When this option is set to No, a player cannot join the table if they have the same IP address as another player already seated at the table. Localhost IPs 127.0.0.1 and 0:0:0:0:0:0:0:1 are exempted.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Rathole minutes:</td>
                        <td><Field type="text" name={"RatholeMinutes"} value="0" component={"input"}
                                   className={style.form_input} placeholder="0"
                                   title="When a player leaves the table, this is the minimum number of minutes (0 to 999999) they must wait if they want to return with a smaller stack. The default value is 0."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Sitout minutes:</td>
                        <td><Field type="text" name={"SitoutMinutes"} value="10" component={"input"}
                                   className={style.form_input} placeholder="10"
                                   title="This is the maximum number of consecutive minutes (1 to 120) that a player can sit out before being automatically removed from the table. The default value is 10."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Sitout relaxed:</td>
                        <td><Field name={"SitoutRelaxed"} component={"select"} className={style.form_select} required
                                   title="Set to Yes to keep sitout-expired players at the table if the waiting list is empty.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Table graphic:</td>
                        <td><Field type="text" name={"TableGraphic"} component={"input"} className={style.form_input}
                                   title="Pro/Gold feature. Enter the full path of a local image file (700 x 510 GIF, PNG or JPG format) to use as the table graphic. Leave this value blank to use the default system graphic."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Note:</td>
                        <td><Field type="text" name={"Note"} value="" component={"input"} className={style.form_input}
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
                            <NavLink to="/ringgames"> <Button variant="contained" color="primary">
                                Return
                            </Button></NavLink>
                            {props.adtablenew.Error !== '' ? <h3 style={{color: 'red'}}>{props.adtablenew.Error === '' ?
                                <CircularProgress/> : props.adtablenew.Error}</h3>
                                : <h3 style={{color: 'green'}}>{props.adtablenew.Result}</h3>}
                            {/*<Field type="button" value="Cancel" onClick="send('RGCancel')" component={"button"}/>*/}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
const afterSubmit = (result, dispatch) => {
    dispatch(reset('addtable'));
}
let ContactForm = reduxForm({form: 'addtable', onSubmitSuccess: afterSubmit,})(FormAddTable);
const AddTable = (props) => {
    const onSubmit = (values) => {
        let args = [
            values.GameID,
            values.Description === undefined ? '' : values.Description,
            values.AutoStart,
            values.GameType,
            values.MixedList,
            values.MixedHands === undefined ? 0 : values.MixedHands,
            values.Password === undefined ? '' : values.Password,
            values.Private,
            values.PermPlay === undefined ? '' : values.PermPlay,
            values.PermObserve === undefined ? '' : values.PermObserve,
            values.PermPlayerChat === undefined ? '' : values.PermPlayerChat,
            values.PermObserverChat === undefined ? '' : values.PermObserverChat,
            values.SuspendChatAllIn,
            values.Seats === undefined ? 9 : values.Seats,
            // values.StartMin,
            // values.StartCode,
            values.PrimaryCurrency,
            values.SmallestChip === undefined ? 0.01 : values.SmallestChip,
            values.BuyInMin === undefined ? 400 : values.BuyInMin,
            values.BuyInMax === undefined ? 5000 : values.BuyInMax,
            values.BuyInDef === undefined ? 1200 : values.BuyInDef,
            values.CapLimit === undefined ? 20 : values.CapLimit,
            values.RakePercent === undefined ? 0 : values.RakePercent,
            values.RakeCap === undefined ? 0 : values.RakeCap,
            values.TurnClock === undefined ? 30 : values.TurnClock,
            values.TurnWarning === undefined ? 10 : values.TurnWarning,
            values.BankClock === undefined ? 60 : values.BankClock,
            values.BankSync,
            values.BankReset === undefined ? 0 : values.BankReset,
            values.DisProtect,
            values.SmallBlind === undefined ? 10 : values.SmallBlind,
            values.BigBlind === undefined ? 20 : values.BigBlind,
            values.AllowStraddle,
            values.SmallBet === undefined ? 20 : values.SmallBet,
            values.BigBet === undefined ? 40 : values.BigBet,
            values.Ante === undefined ? 0 : values.Ante,
            values.AnteAll,
            values.BringIn === undefined ? 0 : values.BringIn,
            values.AllowDupeIPs,
            values.RatholeMinutes === undefined ? 0 : values.RatholeMinutes,
            values.SitoutMinutes === undefined ? 10 : values.SitoutMinutes,
            values.SitoutRelaxed,
            values.TableGraphic === undefined ? '' : values.TableGraphic,
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
        props.addTableThunk(args);
    }
    return <div>
        <ContactForm mixed={props.adtablenew.MixedRing} adtablenew={props.adtablenew}
                     mixedRingGamesThunk={props.mixedRingGamesThunk} onSubmit={onSubmit}/>
    </div>
}
export default AddTable;
