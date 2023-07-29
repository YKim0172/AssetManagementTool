import React from 'react'
import "../DetailedUserPage.css"
import { useState } from 'react';
import { Chart as ChartJS} from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import { useEffect } from 'react';
import axios from 'axios';
//red " "#ff385c
//green #00D100
const AccountPiechart = () => {    
  async function queryData() {
        let colorsList = [];
        try {
          //get list of groups first
          const listOfProfits = await axios.post('/user/getDataForOverview', {
            string: "START"
          });
          console.log(listOfProfits.data.message);
          if (listOfProfits.data.message === 'no data') {
            setUserData({
              labels: "",
              datasets: [{
                label: ["NO STOCKS ADDED"],
                data: [1],
                backgroundColor: "#0000A3",
                borderColor: "black",
                borderWidth: 1.5,
              }],
            });
          } else {
            for (let i = 0; i < listOfProfits.data.profitsList.length; i++) {
              if (listOfProfits.data.profitsList[i] < 0) {
                colorsList.push("#ff385c");
              } else {
                colorsList.push("#00D100");
              }
            }
            setUserData({
              labels: listOfProfits.data.categoryNames,
              datasets: [{
                label: ["Profit"],
                data: listOfProfits.data.profitsList,
                backgroundColor: colorsList,
                borderColor: "black",
                borderWidth: 1.5,
              }],
            });
          }
          // console.log(listOfProfits.data.profitsList);
          // console.log(listOfProfits.data.categoryNames);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        setInterval(function() {
          console.log("sending");
          queryData();
        }, 15000);
        // queryData();
      }, []);

      const options = {
        plugins: {
          legend: {
            display: false,
          },
        },
        animation: {
          animateRotate: false,
        },
      };
      const [userData, setUserData] = useState({
        labels: ["LOADING YOUR DATA"],
        datasets: [{
          label: ["Estimated Time Loading (sec) "],
          data: [5],
          backgroundColor: ["#FFFF00"],
          borderColor: "black",
          borderWidth: 0,
        }],
      })

      return(
        <div className="piechart-area" style={{width: 420, height: 380}}>
          <span className="piechart-instruction">Portfolio Breakdown</span>
          <Doughnut data={userData} options={options} />
        </div>
      );
}

export default AccountPiechart