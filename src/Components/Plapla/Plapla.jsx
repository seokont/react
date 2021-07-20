import * as React from 'react';
import SSlider from "../Slider/Slider";
import s from './Plapla.module.css';
import {compose} from "redux";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import LoginContainer from "../Login/LoginContainer";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RemoveIcon from "@material-ui/icons/Remove";
import style from "../Getplayers/Getplayers.module.css";
import BalanceDecContainer from "../Balance/BalanceDecContainer";
import AddFastPlayerConteiner from "../AddFastPlayer/AddFastPlayerContainer";
import Slider from "../Slider/Slider";
import www from './../../img/www.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Field, reduxForm, reset} from "redux-form";
import {addPlayerTokenThunk} from "../../Reducer/auth-reducer";
import {addPlayerSessionThunk} from "../../Reducer/session-reducer";
const PlaplaEl = (props) => {
    const {handleSubmit} = props
    const [open, setOpen] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const [text, setText] = React.useState('');
    const [em, setEmail] = React.useState('');
    const [ph, setPhone] = React.useState('');
    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };
    const renderTextField = ({
                                 input,
                                 label,
                                 meta: {touched, error},
                                 ...custom
                             }) => (
        <TextField
            label={label}
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
        />
    );
    const handleClickOpen = () => {
        setOpen(true);
    };
    const eventClickCha = (e) => {
        e.preventDefault()
        console.log(e.target)
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Grid container>
                {props.token.Token === "" ? (
                    <Slider/>
                ) : (
                    ""
                )}
            </Grid>
            <Grid container>
                {props.token.Token === "" ? (
                    <Grid container direction="column"
                          justify="center"
                          alignItems="center" style={{height: 'auto', marginTop: '15px'}}>
                        <div>
                            <a
                                href='#create'
                                title="Create Player"
                                style={{color: "#706468"}}
                            >
                                <button style={{
                                    cursor: 'pointer'
                                }} className={s.button1}>Create Player
                                </button>
                            </a>
                            <div
                                id='create'
                                className={style.modalDialog}
                            >
                                <div>
                                    <a
                                        href="#close"
                                        title="Close"
                                        className={style.close}
                                    >
                                        X
                                    </a>
                                    <AddFastPlayerConteiner/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <>
                                <button onClick={handleClickOpenLogin} style={{
                                    cursor: 'pointer', marginTop: '15px'
                                }} className={s.button2}>Login
                                </button>
                                <Dialog open={openLogin} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
                                    <form onSubmit={props.handleSubmit}>
                                        <DialogContent>
                                            <Field
                                                component={renderTextField}
                                                name={"email"}
                                                margin="dense"
                                                id="email"
                                                label="Username"
                                                type="text"
                                                fullWidth
                                                autoFocus
                                            />
                                            <Field
                                                component={renderTextField}
                                                name={"password"}
                                                margin="dense"
                                                id="password"
                                                label="Password"
                                                type="password"
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions style={{justifyContent: 'center'}}>
                                            <Button type="submit" onClick={handleCloseLogin} color="primary" >
                                                Login
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                            </>
                        </div>
                        <img style={{
                            cursor: 'pointer', marginTop: '5px'
                        }} onClick={handleClickOpen} src={www} width='80'/>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <form method='post' action='https://texasroom.online/send.php'>
                                <DialogTitle id="form-dialog-title">Ask us a question</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    </DialogContentText>
                                    <TextField
                                        name='name'
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        required='required'
                                        onChange={(e) => {
                                            setText(e.target.value)
                                        }}
                                    />
                                    <TextField
                                        name='email'
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                    <TextField
                                        name='number'
                                        margin="dense"
                                        id="number"
                                        label="Phone"
                                        type="tel"
                                        fullWidth
                                        onChange={(e) => {
                                            setPhone(e.target.value)
                                        }}
                                    />
                                    <TextField
                                        id="koment"
                                        name='koment'
                                        label="Ask a Question"
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions style={{justifyContent: 'center'}}>
                                    {/*<Button  onClick={handleClose} color="primary">*/}
                                    {/*    Cancel*/}
                                    {/*</Button>*/}
                                    <Button type="submit"
                                            onClick={text !== '' && ph !== '' && em !== '' ? handleClose : ''}
                                            color="primary">
                                        Send message
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
        </div>
    );
}
const afterSubmit = (result, dispatch) => {
    dispatch(reset("loginadmin"));
};
let PlaplaAdminEnter = reduxForm({
    form: "loginadmin",
    onSubmitSuccess: afterSubmit,
})(PlaplaEl);
const pl = (props) => {
    const onSubmit = (values) => {
        let args = [values.email, values.password];
        props.addPlayerTokenThunk(args);
    };
    return (
        <div>
            <PlaplaAdminEnter
                {...props}
                addPlayerTokenThunk={props.addPlayerTokenThunk}
                addPlayerSessionThunk={props.addPlayerSessionThunk}
                onSubmit={onSubmit}
            />
        </div>
    );
};
let mapStateToProps = (state) => ({
    token: state.Token,
});
const Plapla = compose(connect(mapStateToProps, {
    addPlayerTokenThunk,
    addPlayerSessionThunk
}))(pl);
export default Plapla;
