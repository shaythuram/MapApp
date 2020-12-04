import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { Container, Row,  Col } from 'react-grid-system';
import {  Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Provider,connect } from 'react-redux'
import * as allstores from './data/allstores.json'
import { render} from 'react-dom';
class Picker extends Component {
    state = {
        Day: null,
        Time:null,
        Loc:"ll",
      };
    handleChange = e => {
    e.preventDefault();
    this.setState({ 
        [e.target.id]: e.target.value
    });
    console.log(this.state.Day , this.state.Time  , "DAYTIME STATE CHANGED IN INFOPICKER")
    
    };
    handleSubmit= event => {
        event.preventDefault();
        this.props.Picker(this.state);
      }
    render() {
              
        

        // var reducer_data= [this.props.data[0]]
        // const data = allstores['features']
        // console.log(reducer_data[0], " {Place_ID:... , Store:...}" )
        // if (reducer_data.length == 1){
        //     var Dict_Data = reducer_data[0]
        //     console.log(Dict_Data , " Dict_DATA of  {Place_ID:... , Store:...}")
        //     try{/// this try is essential if not the page wont load
        //         let i = 0
        //         var id = Dict_Data["Place_ID"]
        //         for (i in data ){
        //             if(data[i].Place_ID  == id){
        //                 var location = []
        //                 var storename = []
        //                 var averagePT = []
        //                 var highestPTOfDay = []
        //                 storename.push(data[i].store)
        //                 try{
        //                     try{
        //                         var request = require('then-request');
        //                         var address_req = request('GET', `https://spatialapi-dot-wide-saga-271117.et.r.appspot.com/getaddress/${id}`);
        //                         var address = address_req.getBody().slice(1,-1)
        //                         var address = JSON.parse(address)
        //                         var address = address[id][0].Address
        //                         location.push(address)
        //                     }
        //                     catch(err){
        //                         location.push("Tried to get Data from API,failed.")
        //                     }

        //                     try{
        //                         var request = require('then-request');
        //                         var avgpt_req = request('GET', `https://spatialapi-dot-wide-saga-271117.et.r.appspot.com/getavgpt/${id}`);
        //                         var avgPT = avgpt_req.getBody().slice(1,-1)
        //                         var avgPT = JSON.parse(avgPT)
        //                         var avgPT = avgPT[id][0].avgPopulartime
        //                         var avgPT = parseInt(avgPT, 10)
        //                         averagePT.push(avgPT)
        //                     }
        //                     catch(err){
        //                         averagePT.push("Tried to get Data from API, process failed.")
        //                     }
        //                     try{
        //                         var request = require('then-request');
        //                         var getbestbydaypt_req = request('GET', `https://spatialapi-dot-wide-saga-271117.et.r.appspot.com/getbestbydaypt/${id}`);
        //                         var getbestbydaypt = getbestbydaypt_req.getBody().slice(1,-1)
        //                         var getbestbydaypt = JSON.parse(getbestbydaypt)
        //                         var getbestbydaypt = getbestbydaypt[id]
        //                         console.log(getbestbydaypt)
        //                         // var getbestbydaypt = parseInt(getbestbydaypt, 10)
        //                         // console.log(getbestbydaypt)
        //                         // highestPTOfDay.push(getbestbydaypt)
        //                         highestPTOfDay.push("tester")
        //                     }
        //                     catch(err){
        //                         highestPTOfDay.push("Tried to get Data from API,failed.")
        //                     }
        //                 }
        //                 catch(err){
        //                     let location = null;
        //                     let storename = null;
        //                     let averagePT = null;
        //                     let highestPTOfDay = null;
        //                 }
        //             }
        //         }
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        //     try{
        //         console.log(highestPTOfDay)
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }
        return (
            <div >
                <Form onSubmit={this.handleSubmit} style={{  marginTop: '5px' , width: "20vw", height: "50vh" }}>
                
                    <Form.Group controlId="exampleForm.ControlSelect1"  >
                        <Form.Label style={{ marginTop:'10px'}}>Day Select</Form.Label>
                        <Form.Control as="select" size='sm' onChange={this.handleChange}  id='Day' >
                            <option> Choose Day Of The Week </option>
                            <option  value='Monday'>Monday</option>
                            <option  value='Tuesday'>Tuesday</option>
                            <option  value='Wednesday'>Wednesday</option>
                            <option  value='Thursday'>Thursday</option>
                            <option  value='Friday'>Friday</option>
                            <option  value='Saturday'>Saturday</option>
                            <option  value='Sunday'>Sunday</option>
                        </Form.Control>
                        <Form.Label style={{ marginTop:'10px' }}>Time Select</Form.Label>
                        <Form.Control as="select" size='sm' onChange={this.handleChange}  id='Time' >
                            <option> Choose Time Of Day </option>
                            <option value="00:00">00:00</option>
                            <option value="01:00">01:00</option>
                            <option value="02:00">02:00</option>
                            <option value="03:00">03:00</option>
                            <option value="04:00">04:00</option>
                            <option value="05:00">05:00</option>
                            <option value="06:00">06:00</option>
                            <option value="07:00">07:00</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                        </Form.Control>



                    <input type="submit" value="Submit" style={{ marginTop:'100px'}} />
                    </Form.Group>
                    

                </Form>
            </div>
        );
    }
}


export default Picker;

// const mapStateToProps = (state) => {
//     // console.log(state[0].Place_ID)
//     return {
//         data: state
//     }
// }
// export default connect(mapStateToProps)(Picker);