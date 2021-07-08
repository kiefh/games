import React, {useRef, useState, useEffect} from "react"; import clsx from 'clsx'; import CssBaseline from '@material-ui/core/CssBaseline'; import AppBar from '@material-ui/core/AppBar';
    import Toolbar from '@material-ui/core/Toolbar'; import Divider from '@material-ui/core/Divider'; import ListItemIcon from '@material-ui/core/ListItemIcon';
    import {useTheme } from '@material-ui/core/styles'; import { makeStyles } from '@material-ui/core/styles'; import {Link as RouterLink} from "react-router-dom";
    import Grid from "@material-ui/core/Grid"; import SearchBar from "material-ui-search-bar"; import  Typography from "@material-ui/core/Typography"
    import { withStyles } from '@material-ui/core/styles'; import Button from '@material-ui/core/Button'; import Menu from '@material-ui/core/Menu'; import MenuItem from '@material-ui/core/MenuItem';
    import {AiFillClockCircle, AiOutlineHome, AiOutlineTrophy, GiTrophy} from "react-icons/all"; import GridList from "@material-ui/core/GridList";
    import {Router} from "@material-ui/icons";
    import Amplify, { API, graphqlOperation } from 'aws-amplify'; import awsmobile from '../aws-export';
    import { listGameData } from '../graphql/queries';

Amplify.configure({...awsmobile,   aws_appsync_authenticationType: "API_KEY"
});

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        color: theme.palette.common.black,
        fontFamily: 'Playfair Display',
        overflow:'hidden',
        width: "370px",
        display:"block",
        borderBottom: "1px solid grey",
        whiteSpace:'nowrap',
        textOverflow: "ellipsis",
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const StyledMenuItemTwo = withStyles((theme) => ({
    root: {
        color: theme.palette.common.black,
        fontFamily: 'Playfair Display',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

//styles
const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        justifyContent: "center",
        verticalAlign:'middle',
        alignItems: "center",
    },
    button: {
        backgroundColor: 'black',
        fontSize: '22px',
        fontWeight: 'bold',
        fontFamily: 'Zen Dots',
    },
    appBar: {
        background: 'black',
    },
    font: {        fontFamily: 'Playfair Display',
        textAlign:'center',
        justifyContent:'center',
        color:'black',
        textDecoration: 'none',
        fontSize:'140%',
        fontWeight:'bold',
    },
    fontTwo: {        fontFamily: 'Playfair Display',
        textAlign:'left',
        justifyContent:'center',
        backgroundColor:'white',
        paddingLeft:"10%",
        paddingTop:"5%",
        color:'darkblue',
        textDecoration: 'none',
        fontSize:'140%',
        fontWeight:'bold'
        },
    icon: {
        width: '140%',
        height: '140%',
    },
    menuIcon: {
        width: 40,
        height: 40,
    },
    menuItem:{

    }
}));

let gameDataFiltered = []
let gameList = []


export default function NavBar() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

        const fetchGames = async () => {
            try{
                const gameData = await API.graphql(graphqlOperation(listGameData))
                gameList = gameData.data.listGameData.items;
                setGames(gameList)
                }
            catch(error) {
                console.log("error fetching games", error);
            }
        }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState(null);
    const [anchorSearchEl, setAnchorSearchEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("here");
        console.log(event.currentTarget);
    };

    function handleChange(){
        filterGameData(searchValue );

    }

    function openSearchMenu(){
        console.log(gameDataFiltered)
        setAnchorSearchEl(ref1.current);
    }

    function filterGameData(searchValue) {
        gameDataFiltered = [];
        let searchValueLowerCase = searchValue.toLowerCase();
        let searchValueMinusSpecialCharacters = searchValueLowerCase.replace(/[^a-zA-Z ]/g, "");
        let searchWords = searchValueMinusSpecialCharacters.split(" ");
        for (let game of gameList) {
            let gameTitleToLowerCase = game.title.toLowerCase();
            let gameTitleMinusSpecialCharacters = gameTitleToLowerCase.replace(/[^a-zA-Z ]/g, "");
            let gameWords = gameTitleMinusSpecialCharacters.split(" ");
            for (let gameWord of gameWords) {
                if (searchWords.includes(gameWord)) {
                    if(!gameDataFiltered.includes(game)) {
                        gameDataFiltered.push(game)
                    }
                }
            }
        }
        openSearchMenu();
    }

    const handleSearchBarMenuClose = () => {
        setAnchorSearchEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    const theme = useTheme();



    const ref1 = useRef(null);

    return (
            <div >
                <CssBaseline/>

                <AppBar

                                                        position="fixed"
                    className={clsx(classes.appBar)}>
                    <Toolbar>

                        <Grid container spacing={2} className={classes.root}>
                        <Grid item xs={3} ref={ref1} >
                            <SearchBar
                                className="SearchInput"
                                type="text"
                                value={searchValue}
                                onChange={(newValue) => setSearchValue(newValue)}
                                onRequestSearch={() => handleChange()}
                                placeholder={"Search..."}
                            />
                            <StyledMenu classname={classes.font}
                                        anchorEl={anchorSearchEl}
                                        keepMounted
                                        open={Boolean(anchorSearchEl)}
                                        onClose={handleSearchBarMenuClose}
                            >
                                {gameDataFiltered.map((value) => (
                                    <RouterLink style={{textDecoration:'none'}} to={{pathname:"/game-reviews", state:{gameTitle:value.title, gameScoreImg:value.scoreImg,
                                            genre:value.genre, releaseDate:value.releaseDate,
                                            gameDev:value.developer, gameReview: value.reviews, gameLogo:value.logo, gameDes:value.description,
                                            gameScreenshots:value.screenshots, gamePub:value.publisher} }} >
                                    <StyledMenuItem style={{overflow:"hidden", textOverflow: "ellipsis"}}>
                                            <ListItemIcon>
                                            <img src={value.logo} alt={""} className={classes.menuIcon}/>
                                        </ListItemIcon>
                                        {value.title}
                                    </StyledMenuItem>
                                    </RouterLink>
                                ))}
                            </StyledMenu>
                        </Grid>
                        <Grid item xs={2}/>
                            <Grid item xs={1}>
                        <img src={'/logo.png'} alt={""} className={classes.icon} style={{marginLeft: '38%'}}/>
                            </Grid>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <Button className={classes.button}
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClick}
                                >
                                    Menu
                                </Button>
                                <StyledMenu classname={classes.font}
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <RouterLink  to="/" style={{textDecoration: 'none'}}>
                                    <StyledMenuItemTwo>
                                        <ListItemIcon>
                                            <AiOutlineHome fontSize="small" />
                                        </ListItemIcon>
                                        Home
                                    </StyledMenuItemTwo >
                                    </RouterLink>
                                    <RouterLink  to="/coming-soon" style={{textDecoration: 'none'}}>
                                    <StyledMenuItemTwo>
                                        <ListItemIcon>
                                            <AiFillClockCircle fontSize="small" />
                                        </ListItemIcon>
                                        Coming Soon
                                    </StyledMenuItemTwo>
                                    </RouterLink>
                                <Divider/>
                                    <Typography className={classes.fontTwo}>Best</Typography>
                                    <RouterLink  to="/games-of-the-year" style={{textDecoration: 'none'}}>
                                    <StyledMenuItemTwo>
                                        <ListItemIcon>
                                            <AiOutlineTrophy fontSize="small" />
                                        </ListItemIcon>
                                        Games of the Year
                                    </StyledMenuItemTwo>
                                    </RouterLink>
                                    <RouterLink  to="/games-of-all-time" style={{textDecoration: 'none'}}>
                                    <StyledMenuItemTwo>
                                        <ListItemIcon>
                                            <GiTrophy fontSize="small" />
                                        </ListItemIcon>
                                        Games of All Time
                                    </StyledMenuItemTwo>
                                    </RouterLink>
                                </StyledMenu>
                            </Grid>
                            </Grid>
                            </Toolbar>
                </AppBar>
            </div>
        )

}