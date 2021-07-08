import './App.css'; import React, { Component, Fragment, useEffect, useState } from 'react'; import {Switch, Route} from "react-router-dom";
import GamesOfAllTime from './Pages/GamesOfAllTime.js'; import GameReviewsAndroid from "./Pages/GameReviewsAndroid"; import Homes from './Pages/Home'
import {lightBlue} from "@material-ui/core/colors"; import {Box} from "@material-ui/core"; import ComingSoon from "./Pages/ComingSoon";
    import GamesOftheYear from "./Pages/GamesOftheYear"; import {withStyles} from '@material-ui/core/styles';
import Layout from "./Layout"; import Amplify, { API, graphqlOperation } from 'aws-amplify'; import awsmobile from './aws-exports.js';
import { listGameData } from './graphql/queries';

Amplify.configure(awsmobile);



const useStyles = theme => ({
    root: {
        textAlign: 'center',
        background:"linear-gradient(to right top, #1c3862, #006196, #008ba5, #00b181, #23d12a)",
        minHeight:'82vh',
        color: lightBlue,
        fontFamily: 'Playfair Display',
        alignContent:"center",
        justifyContent:"center",
        verticalAlign:'center',
        alignItems:'center',

    },
    body: {
        marginTop: '4%',
        minHeight:'82vh',
        marginBottom: '2%',
        marginLeft: '7%',
        marginRight: '7%',
        textAlign: 'center',
        color: lightBlue,
        fontFamily: 'Playfair Display',
        alignContent:"center",
        justifyContent:"center",
        verticalAlign:'center',
        alignItems:'center',

    },
})


class App extends Component{

    constructor(props) {
        super(props);
    }

    
    render() {
        const { classes } = this.props;
        //console.log(window.)

        this.state = { games: [] };
        const fetchGames = async () => {
            try{
                const gameData = await API.graphql(graphqlOperation(listGameData))
                const gameList = gameData.data.listGameData.items;
                console.log("test", gameList);
                this.setState({ games: this.state.games = gameList});
            }
            catch(error) {
                console.log("error fetching games", error);
            }
        }
        fetchGames();

    return (

            <Box className={classes.root}>
                <Layout>
                    {/* loads logo into layout */}
                    {/* loads sidebar into layout */}
                    {/* provides routes to direct page changes to the correct .js component */}
                <Switch>
                    <Route exact path="/" component={Homes}/>
                    <div className={classes.body}>
                        <Route path="/games-of-all-time" component={GamesOfAllTime}/>
                    <Route path="/games-of-the-year" component={GamesOftheYear}/>
                    <Route path="/coming-soon" component={ComingSoon}/>
                    <Route path="/game-reviews" component={GameReviewsAndroid}/>
                    <Route path="/terms-of-use" component={GamesOfAllTime}/>
                    <Route path="/contact-us" component={GamesOftheYear}/>
                    <Route path="/privacy-policy" component={ComingSoon}/>
                    </div>
                </Switch>
            </Layout>
            </Box>

    )
    }
}

export default withStyles(useStyles)(App)
