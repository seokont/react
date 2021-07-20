import React from "react";
import * as axios from "axios";

class Poker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: "",
            login: "",
            Token: ''
        };

        // cookies.set('Token', this.props.token.Token, {path: '/'});
        // this.props.addLocalStorageTokenThunk(cookies.get("Token"))
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props
    }

    async componentDidMount() {
        // let x = localStorage.getItem("token");
        const res = await axios.post(
            `https://texas83.com/wp-json/pokerapi/v1/authsession/?token=${this.props.token.Token}`,
        );
        this.setState({session: res.data.session, login: res.data.name});
        this.props.addSessionThunk(res.data.role);
        this.props.addNameThunk(res.data.name);
        this.props.addBalanceThunk(res.data.balance);


    }



    async componentDidUpdate(prevProps, prevState) {
        if (this.props.token.Token != prevProps.token.Token) {
            const res = await axios.post(
                `https://texas83.com/wp-json/pokerapi/v1/authsession/?token=${this.props.token.Token}`
            );

            this.setState({session: res.data.session, login: res.data.name});
            this.props.addSessionThunk(res.data.role);
            this.props.addNameThunk(res.data.name);
            this.props.addBalanceThunk(res.data.balance);
        }
    }

    linkPoker() {
        if (this.state.session !== "") {
            let link = `https://affiliateprogrampoker.online/?LoginName=${this.state.login}&SessionKey=${this.state.session}`;
            return link;
        }
        let linku = `https://affiliateprogrampoker.online/?LoginName=&SessionKey=`;
        return linku;
    }

    render() {
        return (
            <div style={{backgroundColor: '#000'}}>
                <iframe
                    allowFullScreen
                    src={this.linkPoker()}
                    width="100%"
                    style={{height: '93vh'}}
                    display="initial"
                    frameBorder="0"
                ></iframe>
            </div>
        );
    }


}

export default Poker;
