import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Chart = ({search_data}) => {

    const [chartData, setChartData] = useState({});



    // const [employeeSalary, setEmployeeSalary] = useState([]);
    // const [employeeAge, setEmployeeAge] = useState([]);

  const chart = () => {
      if (search_data.length > 0){
        var stores = []
        var i = 0
        for (i = 0; i < search_data.length; i++) {
          stores.push(search_data[i].name)
        }
        console.log(stores , 'store_list')
        setChartData(
          {
          labels: stores,
          datasets: [
            {
              label: "level of thiccness",
              data: [69,32,45,12,12,69,32,45,12,12,69,32,45,12,12,69,32,45,12,12],
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        })
      }
      setChartData(
        {
        labels: ["stores" , "shay" , "hahah" , "lol"],
        datasets: [
          {
            label: "level of thiccness",
            data: [69,32,45,12],
            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
            borderWidth: 4
          }
        ]
      });


  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">

      <div>
        <Line
          data={chartData}
          width={100}
          height={50}

          options={{
            maintainAspectRatio: true,
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
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
        <Line
          data={chartData}
          width={100}
          height={50}

          options={{
            maintainAspectRatio: true,
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
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
    </div>
  );
};

export default Chart;

// https://spatialapi-dot-wide-saga-271117.et.r.appspot.com/getaddress/${id}