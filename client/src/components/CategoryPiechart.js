import React from 'react'
import '../group.css'
import { useState } from 'react';
import { Chart as ChartJS} from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import { useEffect } from 'react';
import axios from 'axios';


const CategoryPiechart = ({categoryID}) => {

    const [displayData, setDisplayData] = useState({
        percent: 0,
        name: "",
        ready: false
    });

    async function queryGroupProfit() {
        let colorsList = [];
        try {
            console.log(categoryID);
            //first get the percent of group
            const percentGroupData = await axios.post('/user/getPercentForGroup', {
                categoryID: categoryID
            });
            console.log(percentGroupData.data);
            setDisplayData({
                percent: percentGroupData.data.percent,
                name: percentGroupData.data.categoryName,
                ready: true,
            });

            const listProfits = await axios.post('/user/getDataForGroup', {
                string: "START",
                categoryID: categoryID
            });
            for (let i = 0; i < listProfits.data.profitsList.length; i++) {
                if (listProfits.data.profitsList[i] < 0) {
                  colorsList.push("#ff385c");
                } else {
                  colorsList.push("#00D100");
                }
            }
            setUserData({
                labels: listProfits.data.tickerNames,
                datasets: [{
                    label: ["Profit"],
                    data: listProfits.data.profitsList,
                    backgroundColor: colorsList,
                    borderColor: "black",
                    borderWidth: 1.5,
                }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setInterval(function() {
            queryGroupProfit();
        }, 20000);
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


    return (
    <div className="category-piechart-area" style={{width: 400, height: 380}}>
        {displayData.ready && (
            <>
                <span className="piechart-instruction">{displayData.name}: {displayData.percent}%</span>
                <Doughnut data={userData} options={options} />
            </>
        )}
        {!displayData.ready && (
            <span className="piechart-instruction">Loading Data...</span>
        )}
    </div>
    )
}

export default CategoryPiechart