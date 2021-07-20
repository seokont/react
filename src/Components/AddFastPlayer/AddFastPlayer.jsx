import React from "react";
import style from "../NewPlayer/NewPlayer.module.css";
import {Field, reduxForm, reset} from "redux-form";
import {Button} from "@material-ui/core";
import {addPlayerThunk} from "../../Reducer/addplayer-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import {myInputs} from "../../forinput/newinput";
import Box from "@material-ui/core/Box";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import ac from "../../img/main-bg.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",


        backgroundColor: "#1a1a1a",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center center",
        backgroundAttachment: 'fixed',



        padding: "15px",
        border: "1px solid #FEF4B0!important",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "green",
        },
        "& .MuiInput-underline:after": {},
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: "0px",
            },
            "&.MuiInputBase-root": {
                backgroundColor: "#fff",
                borderRadius: "0px",
            },

            "&:hover fieldset": {},
            "&.Mui-focused fieldset": {},
        },
    },
})(Field);

const BootstrapButton = withStyles({
    root: {
        boxShadow: "none",
        textTransform: "none",
        fontSize: 21,
        padding: "10px 12px",
        border: "1px solid",
        borderRadius: "50px",
        lineHeight: 1.5,
        backgroundColor: "green",
        borderColor: "green",
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
            backgroundColor: "#333",
            borderColor: "#333",
            boxShadow: "none",
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "#333",
            borderColor: "#333",
        },
        "&:focus": {
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
        },
    },
})(Button);


const AddFastPlayer = (props) => {

    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    let min = () => {
        if (d.getMinutes().length < 2) {
            return '0' + d.getMinutes();
        }
        return d.getMinutes();
    }

    let hours = () => {
        if (d.getHours().length < 2) {
            return '0' + d.getHours();
        }
        return d.getHours();
    }
    let time = `${year}-${month}-${day} ${hours()}:${min()}`;
    const classes = useStyles();

    return (
        <div>



            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>

                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={props.handleSubmit}
                        >
                            <CssTextField
                                component={myInputs}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                placeholder="Player"
                                name={"Player"}
                                autoComplete="login"
                                autoFocus
                            />
                            <CssTextField
                                component={myInputs}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name={"Password"}
                                placeholder="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                            <BootstrapButton
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                GO
                            </BootstrapButton>
                            {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                        </form>

                </div>

                <Box mt={8} style={{textAlign:'center'}}>
                    {props.adplayer.Error !== '' ? <h3 style={{color: 'red'}}>{props.adplayer.Error === '' ?
                        <CircularProgress/> : props.adplayer.Error}</h3>
                        : <h3 style={{color: 'green'}}>{props.adplayer.Result=="Ok"&&<div>Active Account</div>}</h3>}
                </Box>
            </Container>
































            {/*<form onSubmit={props.handleSubmit}>*/}
            {/*    <table className={style.table}>*/}
            {/*        <tbody>*/}

            {/*        <tr>*/}

            {/*            <td><Field className="stretch" type="text" name={"Player"} component={'input'} placeholder='Player' style={{padding: '10px',width:'250px',margin:'10px 0'}}*/}
            {/*                       title="Enter a unique player name, up to 12 characters. You may only include letters, numbers, dashes, and underscore characters."/>*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Admin profile:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" name={"AdminProfile"} component={'select'}*!/*/}
            {/*        /!*               title="Remote Admin profile name. A blank value indicates no admin rights. This feature is only available in the Gold version.">*!/*/}
            {/*        /!*        <option value="" selected=""></option>*!/*/}
            {/*        /!*    </Field></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Title:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Title"} component={'input'}*!/*/}
            {/*        /!*               title="This is an optional parameter (0 to 15 characters) that can be used to identify a player with a specific site title (moderator, banker, administrator, etc.). The title appears in the player's mouseover hint when seated at a table."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Level:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Level"} component={'input'}*!/*/}
            {/*        /!*               title="This is an optional parameter (0 to 50 characters) that can be used to identify a player's level or ranking as a player based on parameters determined by the site administrator. The level appears in the player's mouseover hint when seated at a table."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Real name:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"RealName"} component={'input'}*!/*/}
            {/*        /!*               title="Player's real name, 0 to 50 characters."/></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        <tr>*/}

            {/*            <td><Field className="stretch" type="text" name={"Password"} component={'input'} placeholder='Password' style={{padding: '10px',width:'250px',margin:'10px 0'}}*/}
            {/*                       title="Player's password."/></td>*/}
            {/*        </tr>*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Gender:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" name={"Gender"} title="Player's gender." component={'select'}>*!/*/}
            {/*        /!*        <option value="Male" selected="">Male</option>*!/*/}
            {/*        /!*        <option value="Female">Female</option>*!/*/}
            {/*        /!*    </Field></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        <tr>*/}
            {/*          /!* <td>Location:</td> *!/*/}
            {/*          /!* <td>Agent:</td>*/}
            {/*          <td><Field className="stretch" type="text" name={"Location"} component={'input'}*/}
            {/*                     title="Agent, from 1 to 30 characters."/></td> *!/*/}
            {/*         /!* <td><Field className="stretch" type="text" name={"Location"} component={'input'}*/}
            {/*                     title="Player's location (e.g., City), from 1 to 30 characters."/></td> *!/*/}
            {/*        </tr>*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Balance:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Balance"} component={'input'}*!/*/}
            {/*        /!*               title="Player's primary account balance. The default value for a new account is determined from the &quot;Starting balance&quot; system setting."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Balance2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Balance2"} component={'input'}*!/*/}
            {/*        /!*               title="Player's secondary account balance (Gold edition only). The default value for a new account is determined from the &quot;Starting balance 2&quot; system setting."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Last reset:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"LastReset"} component={'input'}*!/*/}
            {/*        /!*               placeholder={`${time}`}*!/*/}
            {/*        /!*               title="This is the last date and time that the player's primary balance was last reset."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Last reset2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"LastReset2"} component={'input'}*!/*/}
            {/*        /!*               placeholder={`${time}`}*!/*/}
            {/*        /!*               title="This is the last date and time that the player's secondary balance was last reset."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Permissions:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Permissions"} component={'input'}*!/*/}
            {/*        /!*               title="This is a comma-separated list of permission tokens, giving the player access to restricted ring tables, tournaments, and chat that have a matching token. Tokens are case sensitive and up to 15 alphanumeric characters each."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Tickets:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Tickets"} component={'input'}*!/*/}
            {/*        /!*               title="This is a comma-separated list of ticket tokens, given as prizes from satellite tournaments for entry into other tournaments. Tokens are case sensitive and up to 15 alphanumeric characters each."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chips transfer:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" name={"ChipsTransfer"} component={'select'}*!/*/}
            {/*        /!*               title="Set to Yes to allow player to transfer primary (balance) chips to other players from lobby menu. &quot;Allow primary chip transfers&quot; on System tab must also be enabled.">*!/*/}
            {/*        /!*        <option value="Yes">Yes</option>*!/*/}
            {/*        /!*        <option value="No">No</option>*!/*/}
            {/*        /!*    </Field></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chips transfer2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" name={"ChipsTransfer2"} component={'select'}*!/*/}
            {/*        /!*               title="Set to Yes to allow player to transfer secondary (balance2) chips to other players from lobby menu. &quot;Allow secondary chip transfers&quot; on System tab must also be enabled.">*!/*/}
            {/*        /!*        <option value="Yes">Yes</option>*!/*/}
            {/*        /!*        <option value="No">No</option>*!/*/}
            {/*        /!*    </Field></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chips accept:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" name={"ChipsAccept"} component={'select'}*!/*/}
            {/*        /!*               title="Set to Yes to allow player to accept primary (balance) chip transfers from other players. &quot;Allow primary chip transfers&quot; on System tab must also be enabled.">*!/*/}
            {/*        /!*        <option value="Yes" selected="">Yes</option>*!/*/}
            {/*        /!*        <option value="No">No</option>*!/*/}
            {/*        /!*    </Field></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chips accept2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" name={"ChipsAccept2"} component={'select'}*!/*/}
            {/*        /!*               title="Set to Yes to allow player to accept secondary (balance2) chip transfers from other players. &quot;Allow secondary chip transfers&quot; on System tab must also be enabled.">*!/*/}
            {/*        /!*        <option value="Yes" selected="">Yes</option>*!/*/}
            {/*        /!*        <option value="No">No</option>*!/*/}
            {/*        /!*    </Field></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chat:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Chat"} component={'input'}*!/*/}
            {/*        /!*               placeholder='0000-00-00 00:00'*!/*/}
            {/*        /!*               title="Set to 0000-00-00 00:00 to enable chat privileges or set to a date &amp; time in the future when chat privileges will be automatically reinstated. Set to 9999-99-99 99:99 to keep a permanent ban."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chat color 1:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"ChatColor1"} component={'input'}*!/*/}
            {/*        /!*               title="This is an optional setting that determines the player's chat color (#RRGGBB format) in the lobby window and when seated at a table. Leave blank to use the default &quot;Player chat color&quot; setting specified in the system settings."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Chat color 2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"ChatColor2"} component={'input'}*!/*/}
            {/*        /!*               title="This is an optional setting that determines the player's chat color (#RRGGBB format) when they are an observer at a table. Leave blank to use the default &quot;Observer chat color&quot; setting specified in the system settings."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>First login:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"FirstLogin"} component={'input'}*!/*/}
            {/*        /!*               title="This is the date and time that the player first logged into your site. It is initially set to all zeros."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Last login:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"LastLogin"} component={'input'}*!/*/}
            {/*        /!*               title="This is the last date and time that the player logged into your site. It is initially set to all zeros."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Logins:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Logins"} component={'input'}*!/*/}
            {/*        /!*               title="This is the number of times the player has logged into your site."/></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Email:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Email"} component={'input'}*!/*/}
            {/*        /!*               title="Player's email address. If a player forgets their password, a reset code will be sent to this address."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Val code:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"ValCode"} component={'input'}*!/*/}
            {/*        /!*               title="This is a random code sent by the server to the player's email address for account validation or password resets. This field is erased automatically once the account is validated."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Avatar index:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Avatar"} component={'input'}*!/*/}
            {/*        /!*               title="This is the player's avatar number in the communal avatar set. Set value to 0 to use the Avatar file instead."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Avatar file:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"AvatarFile"} component={'input'}*!/*/}
            {/*        /!*               title="This is an optional (Pro/Gold only) setting that assigns a specific 32x32 image (GIF, PNG, JPG) file to the player to use as their avatar. This setting is ignored if Avatar Index is not set to 0."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Custom:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Custom"} component={'input'}*!/*/}
            {/*        /!*               title="Optional custom field, up to 50 characters. The caption and other options for this field are set in the Account Settings group on the System tab."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>Note:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"Note"} component={'input'}*!/*/}
            {/*        /!*               title="Optional field for notes, up to 250 characters."/></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>ERake:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"ERake"} component={'input'} placeholder='0'*!/*/}
            {/*        /!*               title="Player's accumulated primary currency rake contributions, calculated via the equal distribution method."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>ERake2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"ERake2"} component={'input'} placeholder='0'*!/*/}
            {/*        /!*               title="Player's accumulated secondary currency rake contributions, calculated via the equal distribution method."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>PRake:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"PRake"} component={'input'} placeholder='0'*!/*/}
            {/*        /!*               title="Player's accumulated primary currency rake contributions, calculated via the proportional distribution method."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>PRake2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"PRake2"} component={'input'} placeholder='0'*!/*/}
            {/*        /!*               title="Player's accumulated secondary currency rake contributions, calculated via the proportional distribution method."/>*!/*/}
            {/*        /!*    </td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>TFees:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"TFees"} component={'input'} placeholder='0'*!/*/}
            {/*        /!*               title="Player's accumulated primary currency tournament fee contributions."/></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        /!*<tr>*!/*/}
            {/*        /!*    <td>TFees2:</td>*!/*/}
            {/*        /!*    <td><Field className="stretch" type="text" name={"TFees2"} component={'input'} placeholder='0'*!/*/}
            {/*        /!*               title="Player's accumulated secondary currency tournament fee contributions."/></td>*!/*/}
            {/*        /!*</tr>*!/*/}
            {/*        <tr>*/}
            {/*            <td colSpan="2" height="60" align="center">*/}
            {/*                <button className={style.button} style={{padding: '10px',width:'250px',margin:'10px 0'}}>*/}
            {/*                    Ok*/}
            {/*                </button>*/}



            {/*                {props.adplayer.Error !== '' ? <h3 style={{color: 'red'}}>{props.adplayer.Error === '' ?*/}
            {/*                    <CircularProgress/> : props.adplayer.Error}</h3>*/}
            {/*                    : <h3 style={{color: 'green'}}>{props.adplayer.Result}</h3>}*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</form>*/}

        </div>
    )
}

const afterSubmit = (result, dispatch) => {
    dispatch(reset('addplayerfast'));
}

let ContactFormPlayerFast = reduxForm({
    form: 'addplayerfast',
    onSubmitSuccess: afterSubmit,
})(AddFastPlayer);


const AddPlayerfast = (props) => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    let min = () => {
        if (d.getMinutes().length < 2) {
            return '0' + d.getMinutes();
        }
        return d.getMinutes();
    }

    let hours = () => {
        if (d.getHours().length < 2) {
            return '0' + d.getHours();
        }
        return d.getHours();
    }
    let time = `${year}-${month}-${day} ${hours()}:${min()}`;

    let randomEmail = () => {
        let a = Math.floor(Math.random() * 10000) + 1 + 'player@mail.com';

        return a;
    }

    const onSubmit = (values) => {
        let args = [

            values.Player === undefined ? '' : values.Player,
            values.AdminProfile === undefined ? '' : values.AdminProfile,
            values.Title === undefined ? '' : values.Title,
            values.Level === undefined ? '' : values.Level,
            values.RealName === undefined ? '' : values.Player,
            values.Password === undefined ? '' : values.Password,
            values.Location === undefined ? 'Internet' : values.Location,
            values.Email === undefined ? randomEmail() : values.Email,
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
            values.Chat === undefined ? '' : values.Chat,
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

        ];

        props.addPlayerThunk(args);
    }


    return <div>

        <ContactFormPlayerFast adplayer={props.adplayer} mixedThunk={props.mixedThunk} onSubmit={onSubmit}/>
    </div>
}
export default AddPlayerfast;

