import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Field, reduxForm, reset, formValueSelector} from "redux-form";
import {myInputs} from "./../../forinput/newinput";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {compose} from "redux";
import {connect} from "react-redux";
import {authTransferBalanceThunk} from "../../Reducer/balanceransfer-reducer";
import {myInputsField} from "./../../forinput/newinput";
import s from "./BalanceTransfer.module.css";
import TextField from "@material-ui/core/TextField";
import {authTransferUserThunk} from "../../Reducer/balanceransfer-reducer";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import {authPlayersThunk} from "../../Reducer/getplayers-reducer";

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),

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
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        padding: "15px",
        border: "1px solid #FEF4B0!important",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
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

const BalanceTransfer = (props) => {
    const classes = useStyles();

    const handleChange = (event) => {
        props.authTransferUserThunk(event.target.value);
    };

    const PlBal = () => {
        let p = [];
        props.getplayers.map((n) => {
            if (n.Player == props.session.Name) {
                p.push(<div key={n.id}>{n.Balance}</div>);
            }
        });

        return p[0];
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
                    <Field
                        component={"select"}
                        style={{
                            backgroundColor: "#fff",
                            width: "99%",
                            padding: "15px",
                            border: "none",
                        }}
                        name={"user"}
                    >
                        {props.getplayers.map((n) => (
                            <option key={n.id} value={n.Player}>{n.Player}</option>
                        ))}
                    </Field>
                    <CssTextField
                        component={myInputs}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={"amount"}
                        placeholder="Amount"
                        type="number"
                        id="amount"
                        autoComplete="current-password"
                        inputProps={{min: "0", max: PlBal()}}
                    />

                    <BootstrapButton
                        size="large"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        TRANSFER
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

            <Box mt={8}>{/*<Copyright />*/}</Box>
        </Container>
    );
};

const afterSubmit = (result, dispatch) => {
    dispatch(reset("balancetransfer"));
};

let BalanceTrans = reduxForm({
    form: "balancetransfer",
    onSubmitSuccess: afterSubmit,
})(BalanceTransfer);

class BalanceTransferContainer extends React.Component {


    render() {

        const onSubmit = (values) => {

            let args = [this.props.session.Name, values.user, values.amount];


            // props.getplayers.map((m) => (
            //
            //     props.session.Name == m.Player && m.Balance <= values.amount ? props.authTransferBalanceThunk(args) : props.authTransferBalanceThunk(args2)
            //
            // ))

            this.props.authTransferBalanceThunk(args)
            this.props.authPlayersThunk();
        };

        return (
            <div>
                <BalanceTrans {...this.props} onSubmit={onSubmit}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    token: state.Token,
    session: state.Session,
    transfer: state.Transfer,
    getplayers: state.GetPlayers.AllPlayers,
});

let BalanceTransferContainerContainer = compose(
    connect(mapStateToProps, {
        authTransferBalanceThunk,
        authTransferUserThunk,
        authPlayersThunk
    })
)(BalanceTransferContainer);
export default BalanceTransferContainerContainer;
