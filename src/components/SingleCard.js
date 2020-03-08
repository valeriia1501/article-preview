import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Prompt from './Prompt';

const useStyles = makeStyles({
  card: {
    backgroundColor: '#f7faff',
  },
  cardContent: {
    display: 'block',
    textDecoration: 'none',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#ffffff'
    }
  },
  cardContentHoverOff: {
    display: 'block',
    textDecoration: 'none',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#f7faff'
    } 
  },
  title: {
    marginTop: '20px',
    fontSize: '16px',
    lineHeight: '22px'
  },
  input: {
    marginTop: '20px',
    display: 'block',
    width: '80%',
    fontSize: '16px',
    lineHeight: '22px',
    padding: '0 10px',
    backgroundColor: '#f7faff',
    border: '1px solid #000000'
  },
  hiding: {
    display: 'none'
  }
});

export default function SingleCard(props) {
  const classes = useStyles();
  const {imgUrl, url, title, updateArticle, deleteArticle, indexRow, indexColumn} = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputVal, setInputVal] = React.useState(title);
  const [isShowing, setIsShowing] = React.useState(true);

  const [openPrompt, setOpenPrompt] = React.useState(false);
  const [timeoutPrompt, setTimeoutPrompt] = React.useState(false);

  const handleClickOpen = () => {
    setOpenPrompt(true);
    let notific = setTimeout(() => timeOut(), 4000);
    setTimeoutPrompt(notific);
  };

  const timeOut = () => {
    deleteSingle();
    setOpenPrompt(false);
  }

  const setupInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const editTitle = () => {
    setIsEditing(true);
  }

  const saveTitle = () => {
    updateArticle(inputVal, indexRow, indexColumn);
    setIsEditing(false);
  }

  const deleteSingle = () => {
    deleteArticle(indexRow, indexColumn);
  }

  const hideArticle = () => {
    setIsShowing(false);
    handleClickOpen();
  }

  const imgUrlParse = (str) => {
    // console.log(imgUrl);
    const url = "https://dbstatic.no/?imageId=72007624&panoy=5.3763440860215&panox=0&panow=100&panoh=52.688172043011&heightw=0&heighth=0&heighty=0&heightx=0&height=150&width=110";
    if (url.includes(str)) {
      const midFirstIndex = url.indexOf(str) + 1;
      const midUrl = url.slice(midFirstIndex, url.length);
      let midLastIndex;
      midUrl.includes('&') ? midLastIndex = midUrl.indexOf('&') : midLastIndex = midUrl.length;
      const parameter = midUrl.slice(str.length - 1, midLastIndex) + 'px';
      return parameter;
      console.log(parameter); 
    } 
  }

  imgUrlParse('&height=');
  imgUrlParse('&width=');


  return (
    <div className={isShowing ? '' : classes.hiding}>
      <Card className={classes.card}>
        <CardContent className={isEditing ? classes.cardContentHoverOff : classes.cardContent} component="a" href={url}>
          <img 
            src="https://dbstatic.no/?imageId=72007624&panoy=5.3763440860215&panox=0&panow=100&panoh=52.688172043011&heightw=0&heighth=0&heighty=0&heightx=0" 
            style={{borderRadius: '5px'}} 
            width={imgUrlParse('&width=')}
            // width='120.56px'
            height={imgUrlParse('&height=')}
            alt="Article">
          </img>
          {
            isEditing ? 
              <input className={classes.input} type="text" defaultValue={title} onClick={setupInput} onChange={(e) => setInputVal(e.target.value)}/>
              :
              <Typography className={classes.title} gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          }
        </CardContent>
        <CardActions>
          {
            isEditing ? 
            <Button size="small" color="primary" onClick={saveTitle}>
              Save
            </Button>
            :
            <Button size="small" color="primary" onClick={editTitle}>
              Edit
            </Button>
          }
          <Button size="small" color="primary" onClick={hideArticle}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Prompt 
        openPrompt={openPrompt} 
        setOpenPrompt={setOpenPrompt} 
        deleteSingle={deleteSingle} 
        setIsShowing={setIsShowing} 
        timeoutPrompt={timeoutPrompt}/>
    </div>
  );
}

