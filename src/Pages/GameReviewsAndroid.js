import React from "react"; import GridList from "@material-ui/core/GridList"; 
import Grid from "@material-ui/core/Grid"; import Typography from "@material-ui/core/Typography"; import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider"; import { withStyles } from '@material-ui/core/styles'; import ModalImage from "react-modal-image";
import Amplify, { API, graphqlOperation } from 'aws-amplify'; import awsmobile from '../aws-exports';
import { listReviews } from '../graphql/queries';

Amplify.configure({...awsmobile,   aws_appsync_authenticationType: "API_KEY"
});
//thematic styles for different elements
const useStyles = theme => ({
    root: {
        color: 'darkblue',
        width: "65%",
        height: "100%" ,
        verticalAlign: 'top',
        fontFamily: 'Playfair Display',
        marginRight: '20%',
        marginLeft: '20%'
    },
    typography:{
            fontFamily: 'Playfair Display',
        color: 'darkblue',
        verticalAlign:'bottom',
        textAlign:'left',
        alignItems:'bottom',
        alignContent:'bottom',
    },
    typographyTwo:{
        fontFamily: 'Playfair Display',
        textAlign:'right',
    },
    gridItem: {
        spacing: 20,
    },
    gridListContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    image: {
        width: 128,
        height: 128,
        alignItems: "start",
        alignContent: 'start',
        alignSelf: 'start',
        align: 'start'
    },
    img: {
        width: 50,
        height: 50,
    },
    imgModal: {
        width: 300,
        height: 200,
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'darkblue',
        fontFamily: 'Playfair Display',
        fontSize: '24px',
    },
});

let gameReviews= [];

const fetchGames = async () => {
    try{
        const reviewData = await API.graphql(graphqlOperation(listReviews))
        gameReviews = reviewData.data.listReviews.items;
        }
    catch(error) {
        console.log("error fetching reviews", error);
    }
}

class GameReviewsAndroid extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetchGames();
      }
      componentDidUpdate() {
        fetchGames();
      }

    render() {
        //imports data from the game that was clicked on in the previous screen
        const {gameTitle, genre, gameScoreImg, gameScreenshots, releaseDate, gameDev, gameDes, gameLogo, gameReview, gamePub} = this.props.location.state;

        const { classes } = this.props;

        checkArr(gameReviews);

        //check to make sure the page only shows reviews that are linked to the current game
        function checkArr(arr) {
            for (let i of arr) {
                if (gameReview.includes(i.id)) {gameReviews.push(i);}
            }
        }
        
        return(
            <div>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12} />
                    <Grid item xs={12} />
                    <Grid item xs={12} />

                    {/* game details */}
                <Grid item xs={3}>
                        <Typography className={classes.typography}  color="textSecondary">
                            <Typography className={classes.header}> {gameTitle}</Typography>
                            {releaseDate}
                        </Typography>
                </Grid>
                    <Grid item xs={1}>
                        <img className={classes.img} src={gameScoreImg} alt={""} />
                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                <Grid item xs={2}>
                            <img className={classes.image} src={gameLogo} alt={""} />
                    </Grid>
                <Grid item xs={8}>
                    <Typography className={classes.typography} style={{color: 'black'}} >
                        {gameDes}
                    </Typography>
                </Grid>

                <Grid item xs={2} className={classes.typographyTwo}>
                    <Typography style={{fontWeight: "bold"}}>Developer:
                        <Typography style={{color: 'black'}}> {gameDev}</Typography>
                        Publisher:
                        <Typography style={{color: 'black'}}> {gamePub}</Typography>
                        Genre:
                        <Typography style={{color: 'black'}}> {genre}</Typography>
                    </Typography>
                </Grid>
                <Grid item xs={12}/>
                <Grid item xs={12}>
                <Divider />
                </Grid>

                    <Grid item xs={12}>
                        <Typography className={classes.typography} style={{fontWeight: "bold"}} variant="h6" >Screenshots</Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <ModalImage className={classes.imgModal}
                        small={gameScreenshots[0]}
                        large={gameScreenshots[0]}
                        alt=""
                    />;
                    </Grid>
                    <Grid item xs={4}>
                        <ModalImage className={classes.imgModal}
                                    small={gameScreenshots[1]}
                                    large={gameScreenshots[1]}
                                    alt=""
                        />;
                    </Grid>
                    <Grid item xs={4}>
                        <ModalImage className={classes.imgModal}
                                    small={gameScreenshots[2]}
                                    large={gameScreenshots[2]}
                                    alt=""
                        />;
                    </Grid>

                <Grid item xs={12}/>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                    <Grid item xs={12}>
                    <Typography className={classes.typography} style={{fontWeight: "bold"}} variant="h5" >Critics reviews</Typography>
                </Grid>
                    <Grid item xs={12}/>
                    {/* gridlist of all the different reviews */}
                    <div className={classes.gridListContainer}>
                    <GridList   cols={1} className={classes.gridList} spacing={20}>
                    {gameReviews.map((tile) => (
                        <Grid container >
                            <Grid item xs={12}/>
                            <Grid item xs={2} >
                            <img src={gameScoreImg} alt={""}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.typography} style={{fontWeight: "bold"}}>{tile.reviewer}
                                <Typography style={{color: 'black'}}> {tile.date}</Typography>
                            </Typography>
                        </Grid>
                            <Grid item xs={7}/>

                            <Grid item xs={12}>
                                <Typography className={classes.typography} style={{color: 'black'}}>{tile.description}</Typography>
                            </Grid>
                            <Grid item xs={12}/>
                            <Grid item xs={12}>
                            <Link  className={classes.typography} style={{fontWeight: "bold"}} href={tile.link}> Go to Review
                            </Link>
                            </Grid>
                            <Grid item xs={12}/>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid>

                        ))}
                </GridList>
                    </div>
            </Grid>
                </div>
        )
    }
}


export default withStyles(useStyles)(GameReviewsAndroid)
