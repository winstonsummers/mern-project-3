import React, { Component } from 'react';
import Search from './Search.js';
import RestaurantResults from './RestaurantResults.js';
import EventResults from './EventResults.js';
import axios from 'axios';

class Results extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: '',
      businesses:[]
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange = (e) => {
    this.setState({query: e.target.value});
  }


  preventing = (e) => {
    e.preventDefault();
    axios.post('/saved/results', {
      location: this.state.query,
    }).then((res) => {
      console.log(res.data);
      this.setState({businesses: res.data.businesses});
    }).catch((err) => {
      console.log("error:", err);
    })
  }
  

  saveClick = (e) => {
    e.preventDefault();
    console.log('save click reached');
    let businessToSave;
    for(let i = 0; i < this.state.businesses.length; i++){
      if(this.state.businesses[i].id === e.target.id){
        businessToSave = this.state.businesses[i];
        console.log('for loop', this.state.businesses[i]);
      }
    }
    console.log('businessToSave', businessToSave);
    console.log('user', this.props.user);

    axios.post('/saved/results/restaurantsaved', {
      business: businessToSave,
      user: this.props.user,
    }).then((res) => {
      console.log("response data", res.data);
    }).catch((err) => {
      console.log("err", err);
    })
  }

  render() {
    var results;
    var res = this.state.businesses;
    
    if(this.state.businesses){
      results = res.map((b)=>{
        <li>b</li>
      });
    }else{
      results = <p>none</p>
      console.log(this.state.businesses);
    }
    return(
      <div className="container Results">
        {results}
        <Search query={this.state.query} handleInputChange={(event) => this.handleInputChange(event)} preventing={this.preventing} onSubmit={this.handleSubmit} />
        <RestaurantResults businesses={this.state.businesses} saveClick={this.saveClick} />
        <EventResults />
      </div>
    )
  }
}


export default Results;
