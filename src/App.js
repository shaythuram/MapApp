import React, { Component,useState,useEffect } from 'react';
import {render} from 'react-dom';
import Map from './Map.js'

import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import { Container, Row,  Col } from 'react-grid-system';
import {  Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import Picker_Main from './Picker_Main'
import Chart_Searched from './Chart_Searched'
import Chart_Main from './Chart_Main'
import PlacesWithStandaloneSearchBox from './Searchbox'

const store = createStore(rootReducer);

class App extends Component {
  
  state = {
    DT:  {Day  : undefined , Time : undefined }, 
    sd:[0],
    ego:[0],
    // X_Data:[0]

  }



  check_if_arrays_same = (a,b) =>{
    try{
      var A= []
      var i = 0
      for (i = 0; i < a.length; i++) {
        A.push(a[i].place_id)
      }
      var B= []
      var j = 0
      for (j = 0; j < b.length; j++) {
        B.push(b[i].place_id)
      }
      var Aa = A.toString();
      var Bb = B.toString();   
      return Aa === Bb
    }
    catch(err){
      console.log(a,b ,err)
    }

  };
  DTset = (DayTime)=> {

    this.setState({
      DT:DayTime,
    })
    console.log("DayTime State Set in App.JS")
    console.log(this.state.DT)
  }


  d = (d)=> {
      if(d.slice(-1)[0].name === "ego" ){
        d.pop()
        var old_ego = this.state.ego
        if(!(this.check_if_arrays_same(old_ego,d))){
          console.log("ego State Set in App.JS", this.state.sd ,"Ego in APP.js")
          this.setState({
            ego:d,
          })
        }
      }
      else if(d.slice(-1)[0].name === "to_searched_data"){
        d.pop()
        var old_sd = this.state.sd
        if(!(this.check_if_arrays_same(old_sd,d))){
          console.log("sd State Set in App.JS", this.state.ego ,"sd in APP.js")
          this.setState({
            sd:d,
          })
        }
      }
      // var sd_data = this.state.sd
      // var e_data = this.state.ego
      // var X_data = []
      // console.log(sd_data.length, e_data.length , "lengths")
      // if (sd_data[0] !== 0  && e_data[0] !== 0){
      //   X_data = sd_data.concat(e_data)
      //   this.setState({
      //     X_Data:X_data
      //   })
      // }
      // else if (sd_data[0] !== 0  && e_data[0] === 0) {
      //   X_data = sd_data
      //   this.setState({
      //     X_Data:X_data
      //   })
      // }


  }


/// for some reason line above always prints the data entered previously, 
// not the current data that was set, i.e first console log returns
// empty values but second console log returns first time input, works fine??/
  render() {
    return (
      <div className="App">



                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">MapMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                </Navbar>
                
                <Container fluid>

                      <Row debug >
                          <Col sm={12} style={{height: "50vh"}} debug>  <Map TimeFilter={this.state.DT} Map={this.d}  >  </Map></Col>
                      </Row>
                      <Row debug style={{  marginTop: '1px'}}>
                        <Col  sm={5} style={{aspectRatio:"3"}} debug> <Chart_Searched  Data={this.state.sd} DT ={this.state.DT} >  </Chart_Searched>   </Col>
                        <Col sm={4} style={{ backgroundColor:"dimgray", color: "white", marginBottom: '0px'}} debug> <Picker_Main Picker_Main = {this.DTset}></Picker_Main> </Col>                 
                      </Row>

                      <Row debug style={{  marginTop: '1px'}}>
                        <Col  sm={5} style={{aspectRatio:"3"}} debug> <Chart_Main  Data={this.state.ego} DT ={this.state.DT} >  </Chart_Main>   </Col>
                        <Col sm={4} style={{ backgroundColor:"dimgray", color: "white", marginBottom: '0px'}} debug>  </Col>                 
                      </Row> 
                  </Container>  

        
      </div>
    );
  }
}

export default App;




// <Container fluid>

// <Row debug >
//     <Col sm={12} style={{height: "50vh"}} debug>  <Map TimeFilter={this.state.DT} Map={this.d}  >  </Map></Col>
    
// </Row>
// <Row debug style={{  marginTop: '1px'}}>
//   <Col  sm={3} style={{aspectRatio:"3"}} debug> <Chart_Searched  Data={this.state.sd} >  </Chart_Searched>   </Col>
//   <Col  sm={3} style={{aspectRatio:"3"}} debug>  <Chart_Main Data={this.state.ego} >  </Chart_Main>    </Col>
//   <Col sm={6} style={{ backgroundColor:"dimgray", color: "white", marginBottom: '0px'}} debug> <Picker Picker = {this.DTset}></Picker> </Col>                
   
// </Row>

// </Container>  
