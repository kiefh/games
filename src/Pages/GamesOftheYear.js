import GridList from "@material-ui/core/GridList"; 
import Grid from "@material-ui/core/Grid"; import { makeStyles } from '@material-ui/core/styles'; import GridListTile from '@material-ui/core/GridListTile';
    import GridListTileBar from '@material-ui/core/GridListTileBar'; import Divider from "@material-ui/core/Divider"; import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Link as RouterLink} from "react-router-dom"; import Select, { components } from 'react-select'
import {GiBoxingGloveSurprise, GiCapeArmor, GiJigsawPiece, GiJumpAcross, GiMp5K, GiOpenBook, GiPlatform, GiShield} from "react-icons/gi";
import {BiFootball, MdGames} from "react-icons/all";
import Amplify, { API, graphqlOperation } from 'aws-amplify'; import awsmobile from '../aws-exports';
import { listGameData } from '../graphql/queries'; import React, { useState, useEffect } from 'react'; import {Helmet} from "react-helmet";


Amplify.configure({...awsmobile,   aws_appsync_authenticationType: "API_KEY"
});

const TITLE = 'Games of the Year'

//styles
const useStyles = makeStyles((theme) => ({

    root: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Playfair Display',
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Playfair Display',
        fontSize: '32px',
    },
    select: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'darkblue',
        justifyContent: 'left',
        alignItems: 'left',
        fontFamily: 'Playfair Display',
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    typographyTwo: {
        fontFamily: 'Playfair Display',
        padding: "3%"
    },
    gridList: {
        textAlign: 'left',

        overflow: "hidden",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
    },
    icon: {
        width: '90%',
        height: '90%',
        color: 'rgba(255, 255, 255, 0.54)',
    },
}))

let gameList= [];
let filteredGamesImmutable = [];
let filteredGames = [];

//filters android games data to only  games that are this year - i.e where the date is > todays date,  and are not unreleased
function filterMapByDateThisYear() {
    filteredGames = [];   
    const todaysDate = new Date()
    let parseTodaysDate = Date.parse(todaysDate);
    const yearToday = todaysDate.getFullYear()
    for (let i of gameList) {
        let itemDateObject = new Date(i.releaseDate);
        let itemDate = (i.releaseDate);
        let parseItemDate = Date.parse(i.releaseDate);
        let itemYear = itemDateObject.getFullYear()
        console.log(itemDateObject);
        if (itemYear === yearToday && !itemDate.includes("t.b.d")
            && parseTodaysDate > parseItemDate) {
            filteredGames.push(i);
        }
    }
    filteredGamesImmutable = filteredGames;
    console.log(filteredGamesImmutable)
}


const { ValueContainer, Placeholder} = components;

//add icon to select dropdown menu item
const { Option } = components;
const IconOption = props => (
    <Option {...props}>
        <ListItemIcon>
            {props.data.icon}
        </ListItemIcon>
        {props.data.label}
    </Option>
);

//component to place placeholder text 'filter games' above select upon selecting an option
const CustomValueContainer = ({ children, ...props }) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children.map(children, child =>
                child && child.type !== Placeholder ? child : null
            )}
        </ValueContainer>
    );
};


export default function  GamesOftheYear(){

    const [loading, setLoading] = useState(true) // set some state for loading
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
        //initialises game data map to be displayed

    }, []);

        const fetchGames = async () => {
            try{
                const gameData = await API.graphql(graphqlOperation(listGameData, {limit:214}));
                gameList = gameData.data.listGameData.items;
                setGames(gameList)
                filterMapByDateThisYear();
                setLoading(false) // set Loading to false when you have the data
            }
            catch(error) {
                console.log("error fetching games", error);
            }
        }


    const [selectedGenreOption, setSelectedGenreOption] = React.useState(null);

    //on click of menu item, filter map by the selected genre value
    const handleChangeGenre = (selectedGenreOption) => {
        setSelectedGenreOption(selectedGenreOption.value);
        filterMapByGenre(selectedGenreOption.value);
    }

    //array of genre and genre icons
    const genreOptions = [
        { value: "All Genres", label: "All Genres", icon: <MdGames/> },
        { value: "Puzzle", label: "Puzzle", icon: <GiJigsawPiece/> },
        { value: 'Platformer', label: 'Platformer', icon: <GiJumpAcross/> },
        { value: 'Sports', label: 'Sports', icon: <BiFootball/> },
        { value: 'Strategy', label: 'Strategy', icon: <GiPlatform/> },
        { value: 'Action', label: 'Action', icon: <GiShield/> },
        { value: 'Adventure', label: 'Adventure', icon: <GiOpenBook/> },
        { value: 'Shooter', label: 'Shooter', icon: <GiMp5K/> },
        { value: 'Fighting', label: 'Fighting', icon: <GiBoxingGloveSurprise/> },
        { value: 'Role Playing', label: 'Role Playing', icon: <GiCapeArmor/> }
    ];

    const classes = useStyles();

    if (loading) { 
        return (<div>Loading...Please wait</div>)
      }
    return(
        <div>
            <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
            <Grid container spacing={3} >
                <Grid item xs={12} />
                <Grid item xs={12} />
                <Grid item xs={12} >
                    <h2 className={classes.header}>Best Games of the Year</h2>
                </Grid>
                <Divider></Divider>

                {/* select box to filter games by genre*/}
                <Grid item xs={2}>
                    <Select  className={classes.select} options={genreOptions}
                             onChange={handleChangeGenre}
                             components={{
                                 ValueContainer: CustomValueContainer,
                                 Option: IconOption
                             }}
                             placeholder="Filter Games"
                             styles={{
                                 container: (provided, state) => ({
                                     ...provided,
                                 }),
                                 valueContainer: (provided, state) => ({
                                     ...provided,
                                     overflow: "visible"
                                 }),
                                 placeholder: (provided, state) => ({
                                     ...provided,
                                     position: "absolute",
                                     top: state.hasValue || state.selectProps.inputValue ? -15 : "50%",
                                     transition: "top 0.1s, font-size 0.1s",
                                     fontSize: (state.hasValue || state.selectProps.inputValue) && 15,
                                     fontWeight: 'bold', color: 'darkblue'                                     })
                             }}
                    />
                </Grid>
                <Grid item xs={10}/>
                <Grid item xs={12}>  <Divider/>
                </Grid>

                {/* gridlist of all the different reviews */}
                <GridList xs={6}  cellHeight={'200'} className={classes.gridList} cols={4} spacing={0} style={{width:'100%'}}>
                    {filteredGames.map((tile) => (
                        <GridListTile key={tile.img}  >
                            <RouterLink  to={{pathname:"/game-reviews", state:{gameTitle:tile.title, gameScoreImg:tile.scoreImg, genre:tile.genre, releaseDate:tile.releaseDate,
                                    gameDev:tile.developer, gameReview:tile.reviews, gameLogo:tile.logo, gameDes:tile.description,
                                    gameScreenshots:tile.screenshots, gamePub:tile.publisher} }} >
                                <video width={'100%'}
                                       key={'worldOfGoo'}
                                       onMouseOver={e => e.target.play()}
                                       onMouseOut={e => e.target.pause()}
                                       src={tile.video}/>
                            </RouterLink>
                            <GridListTileBar className={classes.typographyTwo}
                                             title={tile.title}
                                             subtitle={tile.releaseDate}
                                             actionIcon={
                                                 <img src={tile.scoreImg} alt={""} className={classes.icon}>
                                                 </img>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        </div>
    )
}

//filters games data so the map only contains games whose genre matches the provided genre value
function filterMapByGenre(filteredGenreValue){
    let aMap = [];
    if(filteredGenreValue=== 'All Genres'){
        aMap = filteredGamesImmutable
    }
    else {
        for (let i of filteredGamesImmutable) {
            if (i.genre === filteredGenreValue) {
                aMap.push(i);
            }
        }
    }
    filteredGames = aMap;
}
