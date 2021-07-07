import React from "react"; import {makeStyles} from "@material-ui/core/styles"; import {Link as RouterLink} from "react-router-dom";
import {lightBlue} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    img:{
        verticalAlign:"middle"
    },
    rooty: {
        background:"linear-gradient(to right top, #1c3862, #006196, #008ba5, #00b181, #23d12a)",
        minHeight:'100vh',
        color: lightBlue,
        fontFamily: 'Playfair Display',


    },
}));

export default function Home(){
    const classes = useStyles();
    return(
        <div className={classes.rooty}>
                <img src='/logoXl.png' className={classes.img}></img>
        <br/>
            <br/>
            <br/>
            <RouterLink  to="/games-of-all-time" style={{textDecoration: 'none'}}>
            <img src='/button.png'/>
            </RouterLink>
        </div>
    )
}