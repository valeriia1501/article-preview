import React from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';


export default class TitleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }  

  componentDidMount() {
    fetch("https://storage.googleapis.com/aller-structure-task/test_data.json")
      .then(res => res.json())
      .then(
        (result) => {
          let titlesArr = [];
          for(let elem of result[0]) {
            for(let subElem of elem.columns) {
                titlesArr.push(subElem.title); 
            }
          }
          this.setState({
            isLoaded: true,
            data: titlesArr
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
            data.map((elem, index) => {
              return <Typography key={index}>
                • {elem}
              </Typography>
            })
          }
        </div>
      );
    }
  }
}


