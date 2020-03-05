import React from 'react';
import '../App.css';
import SingleCard from './SingleCard';
import Grid from '@material-ui/core/Grid';

export default class CardGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }  

  updateState() {
    let newData = [...this.state.data];
    newData[0].columns[0].title = 'slfslflsf';
    this.setState({data: newData})
  }

  componentDidMount() {
    fetch("https://storage.googleapis.com/aller-structure-task/test_data.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result[0]
          });
          console.log(result[0]);
          console.log(this.state.data[0].type);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log(error);
        }
      )
  } 

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="Container">
          {
            data.map((elem, index) => {
              return <Grid key={index} container spacing={3} className="Row">
                  {
                    elem.columns.map((subElem, index) => {
                      return <Grid key={index} item xs={subElem.width}>
                        <SingleCard imgUrl={subElem.imageUrl} url={subElem.url} title={subElem.title} update={this.updateState.bind(this)}/>
                      </Grid>
                    })
                  }
              </Grid>
            })
          }
        </div>
      );
    }
  }
}


