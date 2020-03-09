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
    delete newData[row].columns[column];
    this.setState({data: newData})
  }

  isContainerHasChidren(row) {
    let isUndefined;
    for (let item of this.state.data[row].columns) {
      if (item !== undefined) {
        isUndefined = true;
        break;
      } else {
        isUndefined = undefined;
      }
    }

    return isUndefined === undefined ? false : true;
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
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
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
              return this.isContainerHasChidren(indexRow) ? 
               <Grid 
                key={indexRow} 
                container spacing={3} className="Row">
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
              </Grid> : ''
            })
          }
        </div>
      );
    }
  }
}


