import React, { useState, useEffect , Component} from "react";
import { Line , Bar} from "react-chartjs-2";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'


class Chart_Main extends Component {
    state={

        searched_stores_list:[],

        loaded:true,
        DT:  {Day  : null , Time : null },
        labels: ["Dummy Store 1" , "Dummy  Store 2" , "Dummy Store 3"],

        datasets: [
          {
            label: "Dummy Data",
            data:[30,20,30] ,
            backgroundColor: "rgb(124,252,0)",
            borderWidth: 4
          }
        ]
    }


    async handleUpdates (stores  , store_ids , DT) {
      console.log(DT)
      var i = 0
      var chunk_size = 7;
      let arr = store_ids;
      
      var groups = arr.map( function(e,i){ 
           return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null; 
      }).filter(function(e){ return e; });
      console.log(groups)
      var PTs  = []

      
      if ( DT != undefined ){
        if( (DT["Day"] == null || DT["Day"] =="weekly" ) ){
          await this.weekly_avg_API(PTs, groups)
        }
        else if( (DT["Day"] != null || DT["Day"] !="weekly" || DT["Day"] != undefined  ) && (DT["Time"] == null || DT["Time"] == undefined || DT["Time"] == "daily") ) {
          await this.daily_avg_API(PTs, groups,DT)//DAILY
        }
        else if((DT["Day"] != null || DT["Day"] !="weekly" || DT["Day"] != undefined  ) && (DT["Time"] != null || DT["Time"] != undefined || DT["Time"] != "daily") ) {
          await this.hourly_data_API(PTs, groups,DT)//Hourly avg
        }
        else{
          await this.weekly_avg_API(PTs, groups)
        }
      }
      else{
        await this.weekly_avg_API(PTs, groups)
      }
      


      let D = PTs.flat(Infinity);
      let keys = stores;
      let values = D
      
      var result = {};
      keys.forEach((keys, i) => result[keys] = values[i]);
      const sorted = Object.fromEntries(
        Object.entries(result).sort(([,a],[,b]) => a-b)
      );

      let DATA = []
      let store_labels = []
      for (i in sorted){
        store_labels.push(i)
        DATA.push(sorted[i])
      }

      console.log(DATA,store_labels)

      this.setState({
          searched_stores_list:store_ids,
          loaded:true,
          DT:DT,
          labels: store_labels,
          datasets: [
            {
              label: "Popular Times",
              data: DATA,
              backgroundColor:  "rgb(124,252,0)",
              borderWidth: 4
            }
          ]
        })
      
      }
    


    check_if_arrays_same = (a,b) =>{

      try{
        var Aa = a.toString();
        var Bb = b.toString();

        return Aa === Bb
      }
      catch(err){

        return true
      }
    };

    check_DT =(a,b)=>{
      try{
        
        
        if(  ((a["Day"] ==  b["Day"])  &&  (a["Time"] ==  b["Time"]))  ){
          // Don't update
          return true
        }
        else{
          return false
        }
      }
      catch(err){
        
        return true
      }
     
    }


    async weekly_avg_API(PTs,groups) {
      var i = 0;
      for (i = 0; i < groups.length; i++) {
        await axios.post('http://0.0.0.0:5000/weekly_avg', groups[i])
        .then(response => {
          var in_data = response.data
          PTs.push(in_data)
         
          // this.
          // this.fd.push(in_data)
        })/// had to implement CORS in flask api if not 405 error
        .catch(err => {console.log(err)})
      }
      return "API CALL DONE"
    }

    async daily_avg_API(PTs,groups,DT) {
      var i = 0;
      for (i = 0; i < groups.length; i++) {
        await axios.post(`http://0.0.0.0:5000/daily_avg/${DT["Day"]}`, groups[i])
        .then(response => {
          var in_data = response.data
          PTs.push(in_data)
         
          // this.
          // this.fd.push(in_data)
        })/// had to implement CORS in flask api if not 405 error
        .catch(err => {console.log(err)})
      }
      return "API CALL DONE"
    }


    async hourly_data_API(PTs,groups,DT) {
      var i = 0;
      for (i = 0; i < groups.length; i++) {
        await axios.post(`http://0.0.0.0:5000/hourly_data/${DT["Day"]}/${DT["Time"]}`, groups[i])
        .then(response => {
          var in_data = response.data
          PTs.push(in_data)
         
          // this.
          // this.fd.push(in_data)
        })/// had to implement CORS in flask api if not 405 error
        .catch(err => {console.log(err)})
      }
      return "API CALL DONE"
    }







    componentDidUpdate(prev_searched_store_list,  data  , store_ids ,DT) {
      let prev_DT = this.state.DT
      console.log(prev_DT,DT)
      console.log((this.check_DT(prev_DT,DT)))
      if ( (!(this.check_if_arrays_same(store_ids,prev_searched_store_list)))  || (!this.check_DT(prev_DT,DT))){
        //////If our searched data for find a store isnt the same as
        ///the prev stores list we update the searched
        

        
        this.handleUpdates(data,   store_ids ,DT )
      }

      
    }


    render() {

        const {Data,DT  } = this.props
        console.log(DT)
        var prev_searched_store_list= this.state.searched_stores_list
        var Data_list = []
        var store_ids = []
        var k =0
        for (k = 0; k < Data.length; k++) {
          Data_list.push(Data[k].name)
          store_ids.push(Data[k].place_id)
        }
        
        this.componentDidUpdate(prev_searched_store_list,  Data_list , store_ids,DT )

        return (
          <div>
          {/* {this.state.loaded ?  */}
            <Bar
              data={this.state}
              width={"1vw"}
              height={"1vh"}
              
              options={{

                layout: {
                  padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0
                  }
              },
                maintainAspectRatio: true,
                responsive: true,
                title: { text: "Popular Times Bar Chart", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true
                      },
                      gridLines: {
                        display: false
                      }
                    }
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false
                      },


                    }
                  ]
                }
              }}
            /> 
            {/* : 
            <Spinner  animation="border" role="status">
              <span sm={2.95}   className="sr-only" style={{height: "1vh" , width: "1vw" }}>Loading...</span>
            </Spinner>            
            } */}
        
          </div>
        );
    }
}

export default Chart_Main;
