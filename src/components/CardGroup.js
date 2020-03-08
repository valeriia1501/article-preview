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

  updateArticle(title, row, column) {
    let newData = [...this.state.data];
    newData[row].columns[column].title = title;
    this.setState({data: newData})
  }

  deleteArticle(row, column) {
    let newData = [...this.state.data];
    // newData[row].columns.splice(column, 1);
    delete newData[row].columns[column];
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
            data.map((elem, indexRow) => {
              return <Grid key={indexRow} container spacing={3} className={elem.columns.length !== 0 ? "Row" : "RowOff"}>
                  {
                    elem.columns.map((subElem, indexColumn) => {
                      return <Grid key={indexColumn} item xs={subElem.width}>
                        <SingleCard
                          indexRow={indexRow} 
                          indexColumn={indexColumn} 
                          imgUrl={subElem.imageUrl} 
                          url={subElem.url} 
                          title={subElem.title} 
                          updateArticle={this.updateArticle.bind(this)}
                          deleteArticle={this.deleteArticle.bind(this)}/>
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


