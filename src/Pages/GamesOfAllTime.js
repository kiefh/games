import React, { useEffect, useState } from "react"; import GridList from "@material-ui/core/GridList"; import Grid from "@material-ui/core/Grid";
 import {makeStyles} from '@material-ui/core/styles'; import GridListTile from '@material-ui/core/GridListTile'; import GridListTileBar from '@material-ui/core/GridListTileBar';
    import Divider from "@material-ui/core/Divider"; import ListItemIcon from '@material-ui/core/ListItemIcon'; import {Link as RouterLink} from "react-router-dom";
    import Select, { components } from 'react-select'; import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
    import TitleIcon from '@material-ui/icons/Title'; import ScoreIcon from '@material-ui/icons/Score';
import {GiBoxingGloveSurprise, GiJigsawPiece, GiJumpAcross, GiMp5K, GiOpenBook, GiPlatform, GiShield, GiCapeArmor} from "react-icons/gi"; import {BiFootball, MdGames} from "react-icons/all";
import Amplify, { API, graphqlOperation } from 'aws-amplify'; import awsmobile from '../aws-exports';
import { listGameData } from '../graphql/queries'; import {Helmet} from "react-helmet";


Amplify.configure({...awsmobile,   aws_appsync_authenticationType: "API_KEY"
});

const TITLE = 'Best Games of All Time'

//styles
const useStyles = makeStyles((theme) => ({

    root: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arvo',
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

let sortedGames = [];
let gameList= [];
let sortedGamesImmutable = [];

//filters android games data to remove games that are unreleased - i.e where the date is > todays date.
function removeComingSoon() {
    sortedGames = [];   
    let todayDate = new Date();
    let parseTodaysDate = Date.parse(todayDate);
    for (let i of gameList) {
        let itemDate = (i.releaseDate);
        let parseItemDate = Date.parse(i.releaseDate);
        if (!itemDate.includes("t.b.d") && parseTodaysDate > parseItemDate) {
            sortedGames.push(i);
        }
    }
    sortedGamesImmutable = sortedGames;
   sortMapByScore();
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

//component to place placeholder text above select upon selecting an option
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


export default function  GamesOfAllTime(){


    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true) // set some state for loading

    useEffect(() => {
        fetchGames();
        //initialises game data map to be displaye
    }, []);

        const fetchGames = async () => {
            try{  
                console.log("here");
                const gameData = await API.graphql(graphqlOperation(listGameData, {limit:200}));
                gameList = gameData.data.listGameData.items;
                console.log(gameList.length);
                setGames(gameList)
                removeComingSoon()
                setLoading(false) // set Loading to false when you have the data
            }
            catch(error) {
                console.log("error fetching games", error);
            }
        }

    const [selectedOption, setSelectedOption] = React.useState(null);
    const [selectedGenreOption, setSelectedGenreOption] = React.useState(null);

    //on click of menu item, sort map by score, release date or name
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption.value);
        console.log(selectedOption.value);
        switch (selectedOption.value) {
            case "Name":
                sortMapByName();
                break;
            case "Release Date":
                sortMapByDate();
                break;
            case "Score":
                sortMapByScore();
                break;
        }
    }

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

    //array of sort options & icons
    const options = [
        { value: "Score", label: "Score", icon: <ScoreIcon/> },
        { value: "Name", label: "Name", icon: <TitleIcon/> },
        { value: "Release Date", label: "Release Date", icon: <CalendarTodayIcon/> }
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
                    <h2 className={classes.header}>Best Games of All Time</h2>
                </Grid>
                    <Divider/>

                    {/* select box to sort games by name, score or release date*/}
                    <Grid item xs={2}>
                        <Select className={classes.select}
                            onChange={handleChange}
                            options={options}
                            components={{
                                ValueContainer: CustomValueContainer,
                                Option: IconOption
                            }}
                            placeholder="Sort Games"
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
                                    fontWeight: 'bold', color: 'darkblue'
                                })
                            }}
                        />

                    </Grid>

                    {/* select box to sort games by genre*/}
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
                <Grid item xs={8}/>
                    <Grid item xs={12}>  <Divider/>
                </Grid>
                    {/* gridlist of all the different reviews */}
                <GridList xs={6}  cellHeight={'200'} className={classes.gridList} cols={4} spacing={0} style={{width:'100%'}}
                    >
                    {sortedGames.map((tile) => (
                        <GridListTile key={tile.img}  >
                            <RouterLink  to={{pathname:"/game-reviews", state:{gameTitle:tile.title, gameScoreImg:tile.scoreImg, genre:tile.genre, releaseDate:tile.releaseDate,
                            gameDev:tile.developer, gameReview:tile.reviews, gameLogo:tile.logo, gameDes:tile.description,
                                    gameScreenshots:tile.screenshots, gamePub:tile.publisher} }} >
                                <video width={'100%'}
                                    key={'worldOfGoo'}
                                    onMouseOver={e => e.target.play()}
                                    onMouseOut={e => e.target.pause()}
                                    src={tile.video}
                                />                            </RouterLink>
                            <GridListTileBar className={classes.typographyTwo}
                                title={tile.title}
                                subtitle={tile.releaseDate}
                                actionIcon={
                                    <img src={tile.scoreImg}  alt={""} className={classes.icon}>
                                    </img>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
            </div>
)
}

//sorts games data so the map is arranged in descending order by game name
function sortMapByName(){
    let aMap1 = sortedGames.sort();
    aMap1.sort( compareTitle );
}

//sorts games data so the map is arranged by games with the highest score
function sortMapByScore(){
    let aMap1 = sortedGames.sort();
    aMap1.sort( compareScore );
}

//filters games data so the map only contains games whose genre matches the provided genre value
function filterMapByGenre(filteredGenreValue){
    let filteredGamesByGenre = [];
    if(filteredGenreValue === 'All Genres'){
        filteredGamesByGenre = sortedGamesImmutable
    }
    else {
        for (let i of sortedGamesImmutable) {
            if (i.genre === filteredGenreValue) {
                filteredGamesByGenre.push(i);
            }
        }
    }
    sortedGames = filteredGamesByGenre;
    }

//sorts games data so the map is arranged in ascending order by game date
function sortMapByDate(){
    let aMap1 = sortedGames;
    aMap1.sort( compareReleaseDate );
}

function compareScore( a, b ) {
    if ( a.score < b.score ){
        return 1;
    }
    if ( a.score> b.score ){
        return -1;
    }
    return 0;
}

function compareTitle( a, b ) {
    if ( a.title < b.title ){
        return -1;
    }
    if ( a.title> b.title ){
        return 1;
    }
    return 0;
}

function compareReleaseDate( a, b ) {
    let aReleaseDate = Date.parse(a.releaseDate);
    let bReleaseDate = Date.parse(b.releaseDate);
    if ( aReleaseDate > bReleaseDate ){
        return -1;
    }
    if ( aReleaseDate  < bReleaseDate ){
        return 1;
    }
    return 0;
}