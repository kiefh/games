import './App.css'; import React, { Component, Fragment, useEffect, useState } from 'react'; import {Switch, Route} from "react-router-dom";
import GamesOfAllTime from './Pages/GamesOfAllTime.js'; import GameReviewsAndroid from "./Pages/GameReviewsAndroid"; import Homes from './Pages/Home'
import {lightBlue} from "@material-ui/core/colors"; import {Box} from "@material-ui/core"; import ComingSoon from "./Pages/ComingSoon";
    import GamesOftheYear from "./Pages/GamesOftheYear"; import {withStyles} from '@material-ui/core/styles';
import Layout from "./Layout"; 
import ContactUs from './Pages/ContactUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfUse from './Pages/TermsOfUse';

const useStyles = theme => ({
    root: {
        textAlign: 'center',
        background:"linear-gradient(to right top, #1c3862, #006196, #008ba5, #00b181, #23d12a)",
        minHeight:'82vh',
        maxHeight: '900vh',
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
                    <Route path="/games-of-the-year" component={GamesOftheYear} />
                    <Route path="/coming-soon" component={ComingSoon}/>
                    <Route path="/game-reviews" component={GameReviewsAndroid}/>
                    <Route path="/terms-of-use" component={TermsOfUse}/>
                    <Route path="/contact-us" component={ContactUs}/>
                    <Route path="/privacy-policy" component={PrivacyPolicy}/>
                    </div>
                </Switch>
            </Layout>
            </Box>

    )
    }
}

export default withStyles(useStyles)(App)
