import React, { Component,useState,useEffect } from 'react';
import {render} from 'react-dom';
import Map from './Map.js'
import InfoPicker from './InfoPicker.js'
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import { Container, Row,  Col } from 'react-grid-system';
import {  Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import Picker from './Picker'
import Chart from './Chart'
import Chartt from './x'
import PlacesWithStandaloneSearchBox from './Searchbox'

const store = createStore(rootReducer);

class App extends Component {
  
  state = {
    DT: [ {Day  :'Monday' , Time : '00:00' }, ],
    sd:[0],
    ego:[0],
    X_Data:[0]

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
    console.log("DayTime State Set in App.JS", DayTime , this.state.DT)
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
          console.log("ego State Set in App.JS", this.state.ego ,"Ego in APP.js")
          this.setState({
            sd:d,
          })
        }
      }
      var sd_data = this.state.sd
      var e_data = this.state.ego
      var X_data = []
      console.log(sd_data.length, e_data.length , "lengths")
      if (sd_data[0] !== 0  && e_data[0] !== 0){
        X_data = sd_data.concat(e_data)
        this.setState({
          X_Data:X_data
        })
      }
      else if (sd_data[0] !== 0  && e_data[0] === 0) {
        X_data = sd_data
        this.setState({
          X_Data:X_data
        })
      }
      else if (e_data[0] !== 0  && sd_data[0] === 0) {
        X_data = e_data
        this.setState({
          X_Data:X_data
        })
      }



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
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
                
                <Container fluid>

                <Row debug >
                    <Col sm={11.9} style={{height: "50vh"}} debug>  <Map TimeFilter={this.state.DT} Map={this.d}  >  </Map></Col>
                    {/* <Col sm={3} style={{ backgroundColor:"dimgray", color: "white", height: "50vh", marginLeft: '5px'}} debug> <Picker Picker = {this.DTset}></Picker> </Col> */}
                </Row>
                <Row debug style={{  marginTop: '5px'}}>
                <Col  style={{height: "190vh" }} debug>  <Chartt  Data={this.state.X_Data} >  </Chartt>  </Col>
                {/* <Col sm={3} style={{ backgroundColor:"transparent", color: "white", height: "130vh", marginLeft: '5px'}} debug> </Col> */}
                </Row>

                </Container>  

        
      </div>
    );
  }
}

export default App;

// export function renderToDOM(container) {

//   // render(<App />, container);
//   render(<Provider store={store}><App /></Provider>, container);

// }

        
        {/* <Map TimeFilter={this.state.DT}  > </Map>
        <InfoPicker InfoPicker = {this.DTset} > </InfoPicker> */}
        {/* <InfoPicker InfoPicker = {this.DTset} Place_ID={this.state.Place_ID} > </InfoPicker> */}
        {/* picks time and sends it to TimeFilter in Shay */}
