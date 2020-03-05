import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  }
});

export default function SingleCard(props) {
  const classes = useStyles();
  const {imgUrl, url, title, update} = props;
  const [isEditing, setIsEditing] = React.useState(false);

  const editTitle = () => {
    setIsEditing(true)
  }

  const saveTitle = () => {
    update()
    setIsEditing(false)
  }

  const setupInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Card className={classes.card}>
        <CardContent className={isEditing ? classes.cardContentHoverOff : classes.cardContent} component="a" href={url}>
          <img src={imgUrl} style={{borderRadius: '5px'}} alt="Article"></img>
          {
            isEditing ? 
              <input className={classes.input} type="text" defaultValue={title} onClick={setupInput}/>
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
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

