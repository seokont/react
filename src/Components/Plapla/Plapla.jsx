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


const Plapla = (props) => {


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
                          justify="space-evenly"
                          alignItems="center" style={{margin: '0 auto', height: '20vh'}}>

                        <div>
                            <a
                                href='#create'
                                title="Create Player"
                                style={{color: "#706468"}}
                            >
                                <button className={s.button1}>Create Player
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
                            <a
                                // href='#login'
                                href='#fer'
                                title="Login"
                                style={{color: "#706468"}}
                            >
                                <button className={s.button2}>Login
                                </button>
                            </a>
                            <div
                                id='login'
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
                                    <LoginContainer/>

                                </div>
                            </div>
                        </div>
                    </Grid>

                ) : (
                    ""
                )}
            </Grid>


        </div>
    );
}


let mapStateToProps = (state) => ({
    token: state.Token,
});

export default compose(connect(mapStateToProps, {}))(Plapla);
