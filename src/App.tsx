import {Route, withRouter} from "react-router-dom";
import RingGamesConteiner from "./Components/Ringgames/RinggamesConteiner";
import NewRingGameConteiner from "./Components/NewRingGame/NewRingGameConteiner";
import HeaderContainer from "./Components/Header/Header";
import {Redirect} from "react-router";
import {compose} from "redux";
import {connect} from "react-redux";
import EditRingGameConteiner from "./Components/EditRingGame/EditRingGameConteiner";
import TournamentsConteiner from "./Components/Tournaments/TournamentsContainer";
import NewTournamentsConteiner from "./Components/NewTournaments/NewTournamentsConteiner";
import EdittournamentConteiner from "./Components/Edittournament/EdittournamentContainer";
import NewPlayerConteiner from "./Components/NewPlayer/NewPlayerContainer";
import EditPlayerConteiner from "./Components/EditPlayer/EditPlayerContainer";
import AddFastPlayerConteiner from "./Components/AddFastPlayer/AddFastPlayerContainer";
import AffiliateContainer from "./Components/Affiliate/AffiliateContainer";
import NavTabs from "./Components/Players/Players";
import LoginContainer from "./Components/Login/LoginContainer";
import PokerContainer from "./Components/Poker/PokerContainer";
import GetallrakeConteiner from "./Components/Getallrake/GetallrakeConteiner";
import BalanceStatisticContainer from "./Components/BalanceStatistic/BalanceStatisticContainer";
import BalanceStatisticBetweenPlayersContainer
    from "./Components/BalanceStatisticBetweenPlayers/BalanceStatisticBetweenPlayersContainer";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Plapla from "./Components/Plapla/Plapla";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        background: '#0E0E0E',
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center center",
        backgroundAttachment: 'fixed',
        height: '100vh'
    },
    paper: {
        padding: theme.spacing(0),
    },
}));

function App(props: any) {
    const classes = useStyles();

    let fer = () => {
        return "#fer";
    };


    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
                spacing={0}
            >
                <Grid
                    item
                    spacing={0}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                >
                    <HeaderContainer/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Route
                    path="/newtournamentsgame"
                    render={() => <NewTournamentsConteiner/>}
                />
                <Route path="/newringgame" render={() => <NewRingGameConteiner/>}/>
                <Route path="/editringgame" render={() => <EditRingGameConteiner/>}/>
                <Route
                    path="/edittournament"
                    render={() => <EdittournamentConteiner/>}
                />
                <Route path="/ringgames" render={() => <RingGamesConteiner/>}/>
                <Route path="/tournaments" render={() => <TournamentsConteiner/>}/>
                <Route path="/affiliate" render={() => <AffiliateContainer/>}/>
                <Route path="/newplayers" render={() => <NewPlayerConteiner/>}/>
                <Route path="/editplayers" render={() => <EditPlayerConteiner/>}/>
                <Route
                    path="/addplayersfast"
                    render={() => <AddFastPlayerConteiner/>}
                />
                <Route path="/conplayers" render={() => <NavTabs/>}/>
                <Route path="/login" render={() => <LoginContainer/>}/>
                <Route path="/poker" render={() => <PokerContainer/>}/>
                <Route path="/allrake" render={() => <GetallrakeConteiner/>}/>
                <Route path="/pla" render={() => <Plapla/>}/>
                <Route path="/balance" render={() => <BalanceStatisticContainer/>}/>
                <Route
                    path="/balanceplayers"
                    render={() => <BalanceStatisticBetweenPlayersContainer/>}
                />
                <Route exact path="/" component={Plapla}/>
                <Route exact path="/">
                    {props.token.Token === "" ? (
                        <Redirect to="/"/>
                    ) : (
                        <PokerContainer/>
                    )}
                </Route>
            </Grid>
        </div>
    );
}

let mapStateToProps = (state: any) => ({
    token: state.Token,
});

export default compose(connect(mapStateToProps, {}))(App);
