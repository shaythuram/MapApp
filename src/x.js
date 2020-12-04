import React, { useState, useEffect , Component} from "react";
import { Line , Bar} from "react-chartjs-2";
import axios from "axios";



class Chartt extends Component {
    state={

        searched_stores_list:[],

        ego_list:[],
        labels: ["Dummy Store 1" , "Dummy  Store 2" , "Dummy Store 3"],

        datasets: [
          {
            label: "Dummy Data",
            data:[30,20,30] ,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderWidth: 4
          }
        ]
    }
    handleUpdates = (stores  , store_ids) => {
        var i = 0
        var data =[]
        for (i = 0; i < stores.length; i++) {
            data.push( Math.floor(Math.random() * 100) +1)
        }
        this.setState({

          searched_stores_list:store_ids,
          labels: stores,
          datasets: [
            {
              label: "Popular Times",
              data: data,
              backgroundColor:  "rgba(75, 192, 192, 0.6)",
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

    componentDidUpdate(prev_searched_store_list,  data  , store_ids) {

      console.log(data);
      if (!(this.check_if_arrays_same(store_ids,prev_searched_store_list))){
        //////If our searched data for find a store isnt the same as
        ///the prev stores list we update the searched
        this.handleUpdates(data,   store_ids)
      }



    }


    render() {

        const {Data  } = this.props

        var prev_searched_store_list= this.state.searched_stores_list
        var Data_list = []
        var store_ids = []
        var k =0
        for (k = 0; k < Data.length; k++) {
          Data_list.push(Data[k].name)
          store_ids.push(Data[k].place_id)
        }
        console.log(store_ids)
        this.componentDidUpdate(prev_searched_store_list,  Data_list , store_ids )





        // this.componentDidUpdate(prev_searched_store_list,  sdata , ego_list)
        return (
            <div>
        <Bar
          data={this.state}
          width={100}
          height={50}
          options={{
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
        </div>
        );
    }
}

export default Chartt;


    // componentDidMount() {
    //   this.setState({
    //     labels: ["Fake Store 1" , "Fake Store 2" , "Fake Store 3"],

    //     datasets: [
    //       {
    //         label: "Popular Times",
    //         data:[30,20,30] ,
    //         backgroundColor: ["rgba(75, 192, 192, 0.6)"],
    //         borderWidth: 4
    //       }
    //     ]
    // })
    // }