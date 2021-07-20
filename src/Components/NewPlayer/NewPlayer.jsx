import React from "react";
import style from "../NewPlayer/NewPlayer.module.css";
import {Field, reduxForm, reset} from "redux-form";
import {Button} from "@material-ui/core";
import {addPlayerThunk} from "../../Reducer/addplayer-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {NavLink} from "react-router-dom";
const NewPlayer = (props) => {
    let d = new Date();
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
            return i;
        }
        return i;
    }
    let time = `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())} ${addZero(d.getHours())}:${addZero(d.getMinutes())}`;
    return (
        <div>
            <form onSubmit={props.handleSubmit} style={{marginTop:'20px'}}>
                <table className={style.table_new_player}>
                    <tbody>
                    <tr>
                        <th colSpan="2"><h2>New Player Account</h2></th>
                    </tr>
                    <tr>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Player:</td>
                        <td><Field className="stretch" type="text" name={"Player"} component={'input'} className={style.form_input}
                                   title="Enter a unique player name, up to 12 characters. You may only include letters, numbers, dashes, and underscore characters."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Admin profile:</td>
                        <td><Field className="stretch" name={"AdminProfile"} component={'select'} className={style.form_select}
                                   title="Remote Admin profile name. A blank value indicates no admin rights. This feature is only available in the Gold version.">
                            <option value="" selected=""></option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Title:</td>
                        <td><Field className="stretch" type="text" name={"Title"} component={'input'} className={style.form_input}
                                   title="This is an optional parameter (0 to 15 characters) that can be used to identify a player with a specific site title (moderator, banker, administrator, etc.). The title appears in the player's mouseover hint when seated at a table."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Level:</td>
                        <td><Field className="stretch" type="text" name={"Level"} component={'input'} className={style.form_input}
                                   title="This is an optional parameter (0 to 50 characters) that can be used to identify a player's level or ranking as a player based on parameters determined by the site administrator. The level appears in the player's mouseover hint when seated at a table."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Real name:</td>
                        <td><Field className="stretch" type="text" name={"RealName"} component={'input'} className={style.form_input}
                                   title="Player's real name, 0 to 50 characters."/></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><Field className="stretch" type="text" name={"Password"} component={'input'} className={style.form_input}
                                   title="Player's password."/></td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td><Field className="stretch" name={"Gender"} title="Player's gender." component={'select'} className={style.form_select}>
                            <option value="Male" selected="">Male</option>
                            <option value="Female">Female</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Location:</td>
                        <td><Field className="stretch" type="text" name={"Location"} component={'input'} className={style.form_input}
                                   title="Player's location (e.g., City), from 1 to 30 characters."/></td>
                    </tr>
                    <tr>
                        <td>Balance:</td>
                        <td><Field className="stretch" type="text" name={"Balance"} component={'input'} className={style.form_input}
                                   title="Player's primary account balance. The default value for a new account is determined from the &quot;Starting balance&quot; system setting."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Balance2:</td>
                        <td><Field className="stretch" type="text" name={"Balance2"} component={'input'} className={style.form_input}
                                   title="Player's secondary account balance (Gold edition only). The default value for a new account is determined from the &quot;Starting balance 2&quot; system setting."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Last reset:</td>
                        <td><Field className="stretch" type="text" name={"LastReset"} component={'input'} className={style.form_input}
                                   placeholder={`${time}`}
                                   title="This is the last date and time that the player's primary balance was last reset."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Last reset2:</td>
                        <td><Field className="stretch" type="text" name={"LastReset2"} component={'input'} className={style.form_input}
                                   placeholder={`${time}`}
                                   title="This is the last date and time that the player's secondary balance was last reset."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Permissions:</td>
                        <td><Field className="stretch" type="text" name={"Permissions"} component={'input'} className={style.form_input}
                                   title="This is a comma-separated list of permission tokens, giving the player access to restricted ring tables, tournaments, and chat that have a matching token. Tokens are case sensitive and up to 15 alphanumeric characters each."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Tickets:</td>
                        <td><Field className="stretch" type="text" name={"Tickets"} component={'input'} className={style.form_input}
                                   title="This is a comma-separated list of ticket tokens, given as prizes from satellite tournaments for entry into other tournaments. Tokens are case sensitive and up to 15 alphanumeric characters each."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Chips transfer:</td>
                        <td><Field className="stretch" name={"ChipsTransfer"} component={'select'} className={style.form_select}
                                   title="Set to Yes to allow player to transfer primary (balance) chips to other players from lobby menu. &quot;Allow primary chip transfers&quot; on System tab must also be enabled.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Chips transfer2:</td>
                        <td><Field className="stretch" name={"ChipsTransfer2"} component={'select'} className={style.form_select}
                                   title="Set to Yes to allow player to transfer secondary (balance2) chips to other players from lobby menu. &quot;Allow secondary chip transfers&quot; on System tab must also be enabled.">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Chips accept:</td>
                        <td><Field className="stretch" name={"ChipsAccept"} component={'select'} className={style.form_select}
                                   title="Set to Yes to allow player to accept primary (balance) chip transfers from other players. &quot;Allow primary chip transfers&quot; on System tab must also be enabled.">
                            <option value="Yes" selected="">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Chips accept2:</td>
                        <td><Field className="stretch" name={"ChipsAccept2"} component={'select'} className={style.form_select}
                                   title="Set to Yes to allow player to accept secondary (balance2) chip transfers from other players. &quot;Allow secondary chip transfers&quot; on System tab must also be enabled.">
                            <option value="Yes" selected="">Yes</option>
                            <option value="No">No</option>
                        </Field></td>
                    </tr>
                    <tr>
                        <td>Chat:</td>
                        <td><Field className="stretch" type="text" name={"Chat"} component={'input'} className={style.form_input}
                                   placeholder='0000-00-00 00:00'
                                   title="Set to 0000-00-00 00:00 to enable chat privileges or set to a date &amp; time in the future when chat privileges will be automatically reinstated. Set to 9999-99-99 99:99 to keep a permanent ban."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Chat color 1:</td>
                        <td><Field className="stretch" type="text" name={"ChatColor1"} component={'input'} className={style.form_input}
                                   title="This is an optional setting that determines the player's chat color (#RRGGBB format) in the lobby window and when seated at a table. Leave blank to use the default &quot;Player chat color&quot; setting specified in the system settings."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Chat color 2:</td>
                        <td><Field className="stretch" type="text" name={"ChatColor2"} component={'input'} className={style.form_input}
                                   title="This is an optional setting that determines the player's chat color (#RRGGBB format) when they are an observer at a table. Leave blank to use the default &quot;Observer chat color&quot; setting specified in the system settings."/>
                        </td>
                    </tr>
                    <tr>
                        <td>First login:</td>
                        <td><Field className="stretch" type="text" name={"FirstLogin"} component={'input'} className={style.form_input}
                                   title="This is the date and time that the player first logged into your site. It is initially set to all zeros."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Last login:</td>
                        <td><Field className="stretch" type="text" name={"LastLogin"} component={'input'} className={style.form_input}
                                   title="This is the last date and time that the player logged into your site. It is initially set to all zeros."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Logins:</td>
                        <td><Field className="stretch" type="text" name={"Logins"} component={'input'} className={style.form_input}
                                   title="This is the number of times the player has logged into your site."/></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><Field className="stretch" type="text" name={"Email"} component={'input'} className={style.form_input}
                                   title="Player's email address. If a player forgets their password, a reset code will be sent to this address."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Val code:</td>
                        <td><Field className="stretch" type="text" name={"ValCode"} component={'input'} className={style.form_input}
                                   title="This is a random code sent by the server to the player's email address for account validation or password resets. This field is erased automatically once the account is validated."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Avatar index:</td>
                        <td><Field className="stretch" type="text" name={"Avatar"} component={'input'} className={style.form_input}
                                   title="This is the player's avatar number in the communal avatar set. Set value to 0 to use the Avatar file instead."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Avatar file:</td>
                        <td><Field className="stretch" type="text" name={"AvatarFile"} component={'input'} className={style.form_input}
                                   title="This is an optional (Pro/Gold only) setting that assigns a specific 32x32 image (GIF, PNG, JPG) file to the player to use as their avatar. This setting is ignored if Avatar Index is not set to 0."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Custom:</td>
                        <td><Field className="stretch" type="text" name={"Custom"} component={'input'} className={style.form_input}
                                   title="Optional custom field, up to 50 characters. The caption and other options for this field are set in the Account Settings group on the System tab."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Note:</td>
                        <td><Field className="stretch" type="text" name={"Note"} component={'input'} className={style.form_input}
                                   title="Optional field for notes, up to 250 characters."/></td>
                    </tr>
                    {/* <tr>
                        <td>ERake:</td>
                        <td><Field className="stretch" type="text" name={"ERake"} component={'input'} className={style.form_input} placeholder='0'
                                   title="Player's accumulated primary currency rake contributions, calculated via the equal distribution method."/>
                        </td>
                    </tr>
                    <tr>
                        <td>ERake2:</td>
                        <td><Field className="stretch" type="text" name={"ERake2"} component={'input'} className={style.form_input} placeholder='0'
                                   title="Player's accumulated secondary currency rake contributions, calculated via the equal distribution method."/>
                        </td>
                    </tr>
                    <tr>
                        <td>PRake:</td>
                        <td><Field className="stretch" type="text" name={"PRake"} component={'input'} className={style.form_input} placeholder='0'
                                   title="Player's accumulated primary currency rake contributions, calculated via the proportional distribution method."/>
                        </td>
                    </tr>
                    <tr>
                        <td>PRake2:</td>
                        <td><Field className="stretch" type="text" name={"PRake2"} component={'input'} className={style.form_input} placeholder='0'
                                   title="Player's accumulated secondary currency rake contributions, calculated via the proportional distribution method."/>
                        </td>
                    </tr>
                    <tr>
                        <td>TFees:</td>
                        <td><Field className="stretch" type="text" name={"TFees"} component={'input'} className={style.form_input} placeholder='0'
                                   title="Player's accumulated primary currency tournament fee contributions."/></td>
                    </tr>
                    <tr>
                        <td>TFees2:</td>
                        <td><Field className="stretch" type="text" name={"TFees2"} component={'input'} className={style.form_input} placeholder='0'
                                   title="Player's accumulated secondary currency tournament fee contributions."/></td>
                    </tr> */}
                    <tr>
                        <td colSpan="2" height="60" align="center">
                            <button className={style.button}>
                                Ok
                            </button>
                            &nbsp;
                            <NavLink to="/conplayers"><Button variant="contained" color="primary">
                                Return
                            </Button></NavLink>
                            {props.adplayer.Error !== '' ? <h3 style={{color: 'red'}}>{props.adplayer.Error === '' ?
                                <CircularProgress/> : props.adplayer.Error}</h3>
                                : <h3 style={{color: 'green'}}>{props.adplayer.Result}</h3>}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
const afterSubmit = (result, dispatch) => {
    dispatch(reset('addplayer'));
}
let ContactFormPlayer = reduxForm({
    form: 'addplayer',
    onSubmitSuccess: afterSubmit,
})(NewPlayer);
const AddPlayer = (props) => {
    let d = new Date();
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
            return i;
        }
        return i;
    }
    let time = `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())} ${addZero(d.getHours())}:${addZero(d.getMinutes())}`;
    const onSubmit = (values) => {
        let args = [
            values.Player === undefined ? '' : values.Player,
            values.AdminProfile === undefined ? '' : values.AdminProfile,
            values.Title === undefined ? '' : values.Title,
            values.Level === undefined ? '' : values.Level,
            values.RealName === undefined ? '' : values.RealName,
            values.Password === undefined ? '' : values.Password,
            values.Location === undefined ? '' : values.Location,
            values.Email === undefined ? '' : values.Email,
            values.ValCode === undefined ? '' : values.ValCode,
            values.Balance === undefined ? '0' : values.Balance,
            values.Balance2 === undefined ? '0' : values.Balance2,
            values.LastReset === undefined ? time : values.LastReset,
            values.LastReset2 === undefined ? time : values.LastReset2,
            values.Avatar === undefined ? '1' : values.Avatar,
            values.AvatarFile === undefined ? '' : values.AvatarFile,
            values.Logins === undefined ? '0' : values.Logins,
            values.FirstLogin === undefined ? '' : values.FirstLogin,
            values.LastLogin === undefined ? '' : values.LastLogin,
            values.Gender === undefined ? 'Male' : values.Gender,
            values.Permissions === undefined ? '' : values.Permissions,
            values.Tickets === undefined ? '' : values.Tickets,
            values.ChipsTransfer === undefined ? 'Yes' : values.ChipsTransfer,
            values.ChipsTransfer2 === undefined ? 'Yes' : values.ChipsTransfer2,
            values.ChipsAccept === undefined ? 'Yes' : values.ChipsAccept,
            values.ChipsAccept2 === undefined ? 'Yes' : values.ChipsAccept2,
            values.Chat === undefined ? time : values.Chat,
            values.ChatColor1 === undefined ? '' : values.ChatColor1,
            values.ChatColor2 === undefined ? '' : values.ChatColor2,
            values.Custom === undefined ? '' : values.Custom,
            values.Note === undefined ? '' : values.Note,
            values.ERake === undefined ? '0' : values.ERake,
            values.ERake2 === undefined ? '0' : values.ERake2,
            values.PRake === undefined ? '0' : values.PRake,
            values.PRake2 === undefined ? '0' : values.PRake2,
            values.TFees === undefined ? '0' : values.TFees,
            values.TFees2 === undefined ? '0' : values.TFees2,
            // values.RingChips === undefined ? '' : values.RingChips,
            // values.RingChips2 === undefined ? '' : values.RingChips2,
            // values.RegChips === undefined ? '' : values.RegChips,
            // values.RegChips2 === undefined ? '' : values.RegChips2,
            // values.SessionID === undefined ? '' : values.SessionID,
        ];
        props.addPlayerThunk(args);
    }
    return <div>
        <ContactFormPlayer adplayer={props.adplayer} mixedThunk={props.mixedThunk} onSubmit={onSubmit}/>
    </div>
}
export default AddPlayer;

