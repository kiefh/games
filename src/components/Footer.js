import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {Link as RouterLink} from "react-router-dom";

var style = {
    backgroundColor: "black",
    padding: "1%",
    left: "0",
    bottom: "0",
    height: "100%",
    width: "100%",

}
var typography = {
    textAlign: "center",
    justifyContent: 'center',
    alignContent: 'center',
    verticalAlign:'center',
    fontFamily: 'Playfair Display',
    color: 'white',
    fontweight: 'bold',
    textDecoration: 'none',
}
var phantom = {
    display: 'block',
    width: '100%',
}

function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <RouterLink  to="/terms-of-use" style={{textDecoration: 'none'}}>
                        <Typography style={typography}>Terms of Use</Typography>
                        </RouterLink>
                    </Grid>
                    <Grid item xs={4}>
                        <RouterLink  to="/privacy-policy" style={{textDecoration: 'none'}}>
                        <Typography style={typography}>Privacy Policy</Typography>
                        </RouterLink>
                </Grid>
                    <Grid item xs={4}>
                        <RouterLink  to="/contact-us" style={{textDecoration: 'none'}}>
                        <Typography style={typography}>Contact Us</Typography>
                        </RouterLink>
                    </Grid>
                    </Grid>
            </div>
        </div>
    )
}

export default Footer