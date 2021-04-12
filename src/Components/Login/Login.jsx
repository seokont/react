import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { myInputs } from "./../../forinput/newinput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Field, reduxForm, reset } from "redux-form";
import almaz from "../../img/cropped-58b3096bc5b5915a7b5ccd22.png";
import ac from "../../img/main-bg.png";
// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    background: `url(${ac})`,
    backgroundColor: "black",
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

let Login = (props) => {
  useEffect(() => {
    props.authPlayersThunk();
  }, []);

  // const [countpass, setPass] = useState('');
  // const [countlog, setLog] = useState('');

  // useEffect(() => {

  //     props.addPlayerTokenThunk('demo0000','12345');

  // }, []);

  // let handleSubmit = (event) =>{

  // props.addPlayerTokenThunk(countlog,countpass);

  // }

  // let handleChangeLog=(event) =>{
  //     setLog( event.target.value);
  //   }

  //   let handleChangePass=(event) =>{
  //     setPass(event.target.value);
  //   }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {props.token.Token === "" ? (
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
              placeholder="Username"
              name={"email"}
              autoComplete="login"
              autoFocus
            />
            <CssTextField
              component={myInputs}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={"password"}
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
        ) : (
          <div style={{ color: "#fff", fontSize: "30px", textAlign: "center" }}>
            GREAT PLAYER
          </div>
        )}
      </div>

      <Box mt={8}>
        {props.token.Password === "Password Error" ? (
          <h3 style={{ textAlign: "center", color: "red" }}>
            {props.token.Password}
          </h3>
        ) : (
          ""
        )}
        {props.token.Login === "Login Error" ? (
          <h3 style={{ textAlign: "center", color: "red" }}>
            {props.token.Login}
          </h3>
        ) : (
          ""
        )}
        {/*<Copyright />*/}
      </Box>
    </Container>
  );
};

const afterSubmit = (result, dispatch) => {
  dispatch(reset("loginadmin"));
};

let LoginAdminEnter = reduxForm({
  form: "loginadmin",
  onSubmitSuccess: afterSubmit,
})(Login);

const LoginAdmin = (props) => {
  const onSubmit = (values) => {
    let args = [values.email, values.password];

    props.addPlayerTokenThunk(args);
  };

  return (
    <div>
      <LoginAdminEnter
        {...props}
        addPlayerTokenThunk={props.addPlayerTokenThunk}
        addPlayerSessionThunk={props.addPlayerSessionThunk}
        onSubmit={onSubmit}
      />
    </div>
  );
};
export default LoginAdmin;
