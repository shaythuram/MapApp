import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { Container, Row,  Col } from 'react-grid-system';
import {  Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Provider,connect } from 'react-redux'
import * as allstores from './data/allstores.json'
import { render} from 'react-dom';
class Picker_Main extends Component {
    state = {
        Day: null,
        Time:null,

      };
    handleChange = e => {
    e.preventDefault();

    this.setState({ 
            [e.target.id]: e.target.value
    });



    
    };
    handleSubmit= event => {
        event.preventDefault();
        this.props.Picker_Main(this.state);
      }
    render() {

        return (
            <div >
                <Form onSubmit={this.handleSubmit} style={{  marginTop: '0px' , width: "20vw", height: "30vh" , padding:"0px"}}>
                
                    <Form.Group controlId="exampleForm.ControlSelect1"  >
                        <Form.Label style={{ marginTop:'10px'}}>Day Select</Form.Label>
                        <Form.Control as="select" size='sm' onChange={this.handleChange}  id='Day' >
                            <option  value='weekly'> Choose Day Of The Week </option>
                            <option  value='weekly'>Weekly Average</option>
                            <option  value='0'>Monday</option>
                            <option  value='1'>Tuesday</option>
                            <option  value='2'>Wednesday</option>
                            <option  value='3'>Thursday</option>
                            <option  value='4'>Friday</option>
                            <option  value='5'>Saturday</option>
                            <option  value='6'>Sunday</option>
                            
                        </Form.Control>
                        <Form.Label style={{ marginTop:'10px' }}>Time Select</Form.Label>
                        <Form.Control as="select" size='sm' onChange={this.handleChange}  id='Time' >
                            <option value='null'> Choose Time Of Day </option>
                            <option  value='daily'>Daily Average</option>
                            <option value="0">00:00</option>
                            <option value="1">01:00</option>
                            <option value="2">02:00</option>
                            <option value="3">03:00</option>
                            <option value="4">04:00</option>
                            <option value="5">05:00</option>
                            <option value="6">06:00</option>
                            <option value="7">07:00</option>
                            <option value="8">08:00</option>
                            <option value="9">09:00</option>
                            <option value="10">10:00</option>
                            <option value="11">11:00</option>
                            <option value="12">12:00</option>
                            <option value="13">13:00</option>
                            <option value="14">14:00</option>
                            <option value="15">15:00</option>
                            <option value="16">16:00</option>
                            <option value="17">17:00</option>
                            <option value="18">18:00</option>
                            <option value="19">19:00</option>
                            <option value="20">20:00</option>
                            <option value="21">21:00</option>
                            <option value="22">22:00</option>
                            <option value="23">23:00</option>
                        </Form.Control>



                    <input type="submit" value="Submit" style={{ marginTop:'80px'}} />
                    </Form.Group>
                    

                </Form>
            </div>
        );
    }
}


export default Picker_Main;

// const mapStateToProps = (state) => {
//     // console.log(state[0].Place_ID)
//     return {
//         data: state
//     }
// }
// export default connect(mapStateToProps)(Picker);