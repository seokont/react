import React from "react";
import style from './EditRingGame.module.css';
import {Field, reduxForm, reset} from "redux-form";
import {NavLink} from "react-router-dom";
import {Button, CircularProgress} from "@material-ui/core";


const FormEditTable = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <table className={style.table_edit_table}>
                    <tbody>

                    <tr>
                        <th colSpan="2"><h2>Edit table: {props.EditMessag.Object.Name}</h2></th>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>New Name:</td>
                        <td><Field type="text" name={"NewGameID"} component={"input"} placeholder='Enter a new name'
                                   title="Specify a unique table name, up to 40 characters."/></td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td><Field type="text" component={"input"} name={"Description"}
                                   placeholder={props.EditMessag.Object.Description}
                                   title="This is an optional description, up to 500 characters. It is displayed at the top of the table's information window and may include HTML tags, including links. See help file for details."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Auto online:</td>
                        <td><Field name={"AutoStart"} component={"select"} required
                                   title="When this option is set to Yes, the ring game will be put online when the game server is started. Otherwise tables must be manually put online with the Action button.">
                            <option value={props.EditMessag.Object.Auto}
                                    selected>{props.EditMessag.Object.Auto}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Game:</td>
                        <td><Field name={"GameType"} component={"select"} required
                                   title="Select a Hold'em, Omaha, Omaha-5, Razz, 7-Card Stud, or Mixed game. When Mixed is selected, fill in the Mixed field also. Only Limit games are available in the Trial Version.">
                            <option value={props.EditMessag.Object.Game}
                                    selected>{props.EditMessag.Object.Game}</option>
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

                    <tr>
                        <td>Mixed:</td>
                        <td><Field type="text" name={"MixedList"} component={"input"}
                                   placeholder={props.EditMessag.Object.MixedList}
                                   title="Select a list of games when Game type is set to Mixed, otherwise leave blank. Each game is played for the duration set by &quot;Mixed hands&quot; and the list loops indefinitely."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Mixed hands:</td>
                        <td><Field type="text" name={"MixedHands"} component={"input"} placeholder="0"
                                   placeholder={props.EditMessag.Object.MixedHands}
                                   title="Number of hands per game when Game type is set to Mixed, 1 to 1000. Or set to 0 to use the seat count."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><Field type="text" name={"Password"} value="" component={"input"}
                                   placeholder={props.EditMessag.Object.PW}
                                   title="Specify a password needed to take a seat at the table or leave this field blank for an open table. You can also use the play permission to restrict play to specific players."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Private:</td>
                        <td><Field name={"Private"} component={"select"} required
                                   title="If a password is set for the table, select Yes to make it completely private or select No to allow observers to watch. You can also use the observe permission to restrict observers.">
                            <option value={props.EditMessag.Object.Private}
                                    selected>{props.EditMessag.Object.Private}</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>

                        </Field></td>
                    </tr>

                    <tr>
                        <td>Play permission:</td>
                        <td><Field type="text" name={"PermPlay"} value="" component={"input"}
                                   placeholder={props.EditMessag.Object.PermPlay}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict play to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the password setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Observe permission:</td>
                        <td><Field type="text" name={"PermObserve"} value="" component={"input"}
                                   placeholder={props.EditMessag.Object.PermObserve}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict observing to specific players who have the same token. Prefix with a dash (-) to only exclude players who have the token. This setting must be blank if the private setting is used."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Player chat permission:</td>
                        <td><Field type="text" name={"PermPlayerChat"} value="" component={"input"}
                                   placeholder={props.EditMessag.Object.PermPlayerChat}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict table chat to players who have the same token. Prefix with a dash (-) to only exclude players who have the token. Leave blank to allow chat from all seated players."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Observer chat permission:</td>
                        <td><Field type="text" name={"PermObserverChat"} value="" component={"input"}
                                   placeholder={props.EditMessag.Object.PermObserverChat}
                                   title="Set a permission token (15 alphanumeric chars max) to restrict table chat to observers who have the same token. Prefix with a dash (-) to only exclude players who have the token. Leave blank to allow chat from all observers."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Suspend chat all-in:</td>
                        <td><select name={"SuspendChatAllIn"} component={"select"} required
                                    title="Select Yes to suspend the table chat when any player has an all-in bet.">
                            <option value={props.EditMessag.Object.SuspendChatAllIn}
                                    selected>{props.EditMessag.Object.SuspendChatAllIn}</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>

                        </select></td>
                    </tr>
                    <tr>
                        <td>Seats:</td>
                        <td><Field type="text" name={"Seats"} placeholder="9" component={"input"}
                                   placeholder={props.EditMessag.Object.Seats}
                                   title="Select the number of seats available at this table, from 2 to 10 (8 max for Stud or Razz)."/>
                        </td>
                    </tr>

                    {/*<tr>*/}
                    {/*    <td>Start minimum:</td>*/}
                    {/*    <td><Field type="text" name={"StartMin"} value="2" component={"input"}*/}
                    {/*               title="Select the minimum number of ready players needed to start a new session."/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td>Start code:</td>*/}
                    {/*    <td><Field type="text" name={"StartCode"} value="0" component={"input"}*/}
                    {/*               title="This is a code (1 to 999999) that can be entered in the Lobby window (Options menu) to start a game that has not met the Start Minimum requirement. Enter 0 to disable this feature."/>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td>Primary currency:</td>
                        <td><Field name={"PrimaryCurrency"} component={"select"} required
                                   title="Select Yes for primary (Balance) or No for secondary (Balance2) funding of the buy-ins. Secondary currency is only supported in the Gold edition.">
                            <option value={props.EditMessag.Object.PrimaryCurrency}
                                    selected>{props.EditMessag.Object.PrimaryCurrency}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Smallest chip:</td>
                        <td><Field name={"SmallestChip"} component={"select"} required
                                   title="Select the denomination of the smallest chip allowed at this table. Buy-in, rake, blinds, and player bets must all be a multiple of this value.">
                            <option value={props.EditMessag.Object.SmallestChip}
                                    selected="">{props.EditMessag.Object.SmallestChip}</option>
                            <option value="0.01">0.01</option>
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
                        <td><Field type="text" name={"BuyInMin"} component={"input"}
                                   placeholder={props.EditMessag.Object.BuyInMin}
                                   title="Select the minimum buy-in for this table. The default value is 400."/></td>
                    </tr>
                    <tr>
                        <td>Maximum buy-in:</td>
                        <td><Field type="text" name={"BuyInMax"} component={"input"}
                                   placeholder={props.EditMessag.Object.BuyInMax}
                                   title="Select the maximum buy-in for this table. The default value is 2000."/></td>
                    </tr>
                    <tr>
                        <td>Default buy-in:</td>
                        <td><Field type="text" name={"BuyInDef"} value="1200" component={"input"}
                                   placeholder={props.EditMessag.Object.BuyInDef}
                                   title="Select the default buy-in for this table. The default value is 1200."/></td>
                    </tr>
                    <tr>
                        <td>Cap limit:</td>
                        <td><Field type="text" name={"CapLimit"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.CapLimit}
                                   title="Cap limit for CL games, typically set at 20 to 40 times the big blind. This setting is not used in Limit/NL/PL games."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rake percent:</td>
                        <td><Field type="text" name={"RakePercent"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.RakePercent}
                                   title="Enter the percentage of chips from each pot that will be raked into the house rake account. This is a Pro/Gold version feature. Set to 0 for the Trial/Lite version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Rake cap:</td>
                        <td><Field type="text" name={"RakeCap"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.RakeCap}
                                   title="Enter the maximum number of chips that can be raked in a single hand. Set to 0 for no cap limit. This is a Pro/Gold version feature. Set to 0 for the Trial/Lite version."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Turn clock:</td>
                        <td><Field type="text" name={"TurnClock"} value="30" component={"input"}
                                   placeholder={props.EditMessag.Object.TurnClock}
                                   title="This is the number of seconds (10 to 120) that the player has to act on each turn. The default value is 30."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Turn warning:</td>
                        <td><Field type="text" name={"TurnWarning"} value="10" component={"input"}
                                   placeholder={props.EditMessag.Object.TurnWarning}
                                   title="This is number of seconds remaining (5 to 119) on the turn clock when a warning is sent to the player and (if sync enabled) their time bank button appears. The default value is 10."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Time bank:</td>
                        <td><Field type="text" name="BankClock" value="60" component={"input"}
                                   placeholder={props.EditMessag.Object.TimeBank}
                                   title="This is a reserve of time (0 to 600 seconds) available to each player on request and via disconnect detection. The default value is 60."/>
                        </td>
                    </tr>


                    <tr>
                        <td>Time bank sync:</td>
                        <td><Field name={"BankSync"} component={"select"} required
                                   title="Select Yes (the default) to show the time bank button with the turn warning. Select No to show the time bank button immediately.">
                            <option value={props.EditMessag.Object.BankSync}
                                    selected>{props.EditMessag.Object.BankSync}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Time bank reset:</td>
                        <td><Field type="text" name={"BankReset"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.BankReset}
                                   title="This is the number of hands that must be played before a player's time bank is automatically refilled. Use 0 to disable the reset feature."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Disconnect protection:</td>
                        <td><Field name={"DisProtect"} component={"select"} required
                                   title="Select Yes to automatically activate a player's time bank if they disconnect during their turn and run out of normal time.">
                            <option value={props.EditMessag.Object.DisProtect}
                                    selected>{props.EditMessag.Object.DisProtect}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Small blind:</td>
                        <td><Field type="text" name={"SmallBlind"} value="10" component={"input"}
                                   placeholder={props.EditMessag.Object.SmallBlind}
                                   title="This is the Small Blind setting. It is only used in Pot Limit and No Limit games. The default value is 10. In Limit games, the Small Blind is half the Small Bet setting."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Big blind:</td>
                        <td><Field type="text" name={"BigBlind"} value="20" component={"input"}
                                   placeholder={props.EditMessag.Object.BigBlind}
                                   title="This is the Big Blind setting. It is only used in Pot Limit and No Limit games. The default value is 20. In Limit games, the Big Blind is equal to the Small Bet setting."/>
                        </td>
                    </tr>

                    <tr>
                        <td>Allow straddle:</td>
                        <td><Field name={"AllowStraddle"} component={"select"} required
                                   title="Set to Yes to give the Under-The-Gun player the option to post a straddle bet (twice the big blind) before the cards are dealt in Hold'em and Omaha games. The default value is &quot;No&quot;.">
                            <option value={props.EditMessag.Object.AllowStraddle}
                                    selected>{props.EditMessag.Object.AllowStraddle}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Small bet:</td>
                        <td><Field type="text" name={"SmallBet"} value="20" component={"input"}
                                   placeholder={props.EditMessag.Object.SmallBet}
                                   title="This is the Small Bet setting. It is only used in Limit games and also determines the blinds in Limit games that use blinds."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Big bet:</td>
                        <td><Field type="text" name={"BigBet"} value="40" component={"input"}
                                   placeholder={props.EditMessag.Object.BigBet}
                                   title="This is the Big Bet setting. It is only used in Limit games."/></td>
                    </tr>
                    <tr>
                        <td>Ante:</td>
                        <td><Field type="text" name={"Ante"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.Ante}
                                   title="This is the ante. Normally not used in Hold'em and Omaha unless &quot;Ante all&quot; is also enabled."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Ante all:</td>
                        <td><Field name={"AnteAll"} component={"select"} required
                                   title="Set to Yes to collect an ante for all games. Set to No (the default) to only collect an ante in Razz and Stud games.">
                            <option value={props.EditMessag.Object.AnteAll}
                                    selected>{props.EditMessag.Object.AnteAll}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Bring-in:</td>
                        <td><Field type="text" name={"BringIn"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.BringIn}
                                   title="This is the bring-in. It is only used in Stud and Razz games and is typically no more than half the Small Bet value."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Allow duplicate IPs:</td>
                        <td><Field name={"AllowDupeIPs"} component={"select"} required
                                   title="When this option is set to No, a player cannot join the table if they have the same IP address as another player already seated at the table. Localhost IPs 127.0.0.1 and 0:0:0:0:0:0:0:1 are exempted.">
                            <option value={props.EditMessag.Object.DupeIPs}
                                    selected>{props.EditMessag.Object.DupeIPs}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Rathole minutes:</td>
                        <td><Field type="text" name={"RatholeMinutes"} value="0" component={"input"}
                                   placeholder={props.EditMessag.Object.RatholeMinutes}
                                   title="When a player leaves the table, this is the minimum number of minutes (0 to 999999) they must wait if they want to return with a smaller stack. The default value is 0."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Sitout minutes:</td>
                        <td><Field type="text" name={"SitoutMinutes"} value="10" component={"input"}
                                   placeholder={props.EditMessag.Object.SitoutMinutes}
                                   title="This is the maximum number of consecutive minutes (1 to 120) that a player can sit out before being automatically removed from the table. The default value is 10."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Sitout relaxed:</td>
                        <td><Field name={"SitoutRelaxed"} component={"select"} required
                                   title="Set to Yes to keep sitout-expired players at the table if the waiting list is empty.">
                            <option value={props.EditMessag.Object.SitoutRelaxed}
                                    selected>{props.EditMessag.Object.SitoutRelaxed}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Table graphic:</td>
                        <td><Field type="text" name={"TableGraphic"} component={"input"}
                                   placeholder={props.EditMessag.Object.TableGraphic}
                                   title="Pro/Gold feature. Enter the full path of a local image file (700 x 510 GIF, PNG or JPG format) to use as the table graphic. Leave this value blank to use the default system graphic."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Note:</td>
                        <td><Field type="text" name={"Note"} value="" component={"input"}
                                   placeholder={props.EditMessag.Object.Note}
                                   title="This is an optional note field, not seen by the players. 500 characters maximum."/>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" height="60" align="center">
                            {/*<Field type="button" value="Ok" onClick="send('RGSaveAdd')" component={"button"}/> */}
                            <button className={style.button}>
                                Ok
                            </button>

                            {props.id}

                            &nbsp;
                            {/*<NavLink to="/ringgames">*/}
                            {/*    <span>Cancel</span>*/}
                            {/*</NavLink>*/}

                           <NavLink to='/ringgames'> <Button variant="contained" color="primary" >
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
    dispatch(reset('edittable'));
}


let ContactFormEdit = reduxForm({form: 'edittable', onSubmitSuccess: afterSubmit,})(FormEditTable);

const EditTable = (props) => {

    const onSubmit = (values) => {
        let args = [

            values.NewGameID === undefined ? '' : values.NewGameID,
            values.Description === undefined ? props.EditMessag.Object.Description : values.Description,
            values.AutoStart === undefined ? props.EditMessag.Object.Auto : values.AutoStart,
            values.GameType === undefined ? props.EditMessag.Object.Game : values.GameType,
            values.MixedList === undefined ? props.EditMessag.Object.MixedList : values.MixedList,
            values.MixedHands === undefined ? props.EditMessag.Object.MixedHands : values.MixedHands,
            values.Password === undefined ? props.EditMessag.Object.PW : values.Password,
            values.Private === undefined ? props.EditMessag.Object.Private : values.Private,
            values.PermPlay === undefined ? props.EditMessag.Object.PermPlay : values.PermPlay,
            values.PermObserve === undefined ? props.EditMessag.Object.PermObserve : values.PermObserve,
            values.PermPlayerChat === undefined ? props.EditMessag.Object.PermPlayerChat : values.PermPlayerChat,
            values.PermObserverChat === undefined ? props.EditMessag.Object.PermObserverChat : values.PermObserverChat,
            values.SuspendChatAllIn === undefined ? props.EditMessag.Object.SuspendChatAllIn : values.SuspendChatAllIn,
            values.Seats === undefined ? props.EditMessag.Object.Seats : values.Seats,
            // values.StartMin,
            // values.StartCode,
            values.PrimaryCurrency === undefined ? props.EditMessag.Object.PrimaryCurrency : values.PrimaryCurrency,
            values.SmallestChip === undefined ? props.EditMessag.Object.SmallestChip : values.SmallestChip,
            values.BuyInMin === undefined ? props.EditMessag.Object.BuyInMin : values.BuyInMin,
            values.BuyInMax === undefined ? props.EditMessag.Object.BuyInMax : values.BuyInMax,
            values.BuyInDef === undefined ? props.EditMessag.Object.BuyInDef : values.BuyInDef,
            values.CapLimit === undefined ? props.EditMessag.Object.CapLimit : values.CapLimit,
            values.RakePercent === undefined ? props.EditMessag.Object.RakePercent : values.RakePercent,
            values.RakeCap === undefined ? props.EditMessag.Object.RakeCap : values.RakeCap,
            values.TurnClock === undefined ? props.EditMessag.Object.TurnClock : values.TurnClock,
            values.TurnWarning === undefined ? props.EditMessag.Object.TurnWarning : values.TurnWarning,
            values.BankClock === undefined ? props.EditMessag.Object.TimeBank : values.BankClock,
            values.BankSync === undefined ? props.EditMessag.Object.BankSync : values.BankSync,
            values.BankReset === undefined ? props.EditMessag.Object.BankReset : values.BankReset,
            values.DisProtect === undefined ? props.EditMessag.Object.DisProtect : values.DisProtect,
            values.SmallBlind === undefined ? props.EditMessag.Object.SmallBlind : values.SmallBlind,
            values.BigBlind === undefined ? props.EditMessag.Object.BigBlind : values.BigBlind,
            values.AllowStraddle === undefined ? props.EditMessag.Object.AllowStraddle : values.AllowStraddle,
            values.SmallBet === undefined ? props.EditMessag.Object.SmallBet : values.SmallBet,
            values.BigBet === undefined ? props.EditMessag.Object.BigBet : values.BigBet,
            values.Ante === undefined ? props.EditMessag.Object.Ante : values.Ante,
            values.AnteAll === undefined ? props.EditMessag.Object.AnteAll : values.AnteAll,
            values.BringIn === undefined ? props.EditMessag.Object.BringIn : values.BringIn,
            values.AllowDupeIPs === undefined ? props.EditMessag.Object.DupeIPs : values.DupeIPs,
            values.RatholeMinutes === undefined ? props.EditMessag.Object.RatholeMinutes : values.RatholeMinutes,
            values.SitoutMinutes === undefined ? props.EditMessag.Object.SitoutMinutes : values.SitoutMinutes,
            values.SitoutRelaxed === undefined ? props.EditMessag.Object.SitoutRelaxed : values.SitoutRelaxed,
            values.TableGraphic === undefined ? props.EditMessag.Object.TableGraphic : values.TableGraphic,
            values.Note === undefined ? props.EditMessag.Object.Note : values.Note,
            props.EditMessag.Object.Name
        ];

        props.editTableThunk(args);
    }


    return <div>

        <ContactFormEdit adtablenew={props.adtablenew} EditMessag={props.EditMessag} {...props} onSubmit={onSubmit}/>
    </div>
}
export default EditTable;
