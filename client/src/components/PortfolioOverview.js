import React, { useEffect, useState } from 'react'
import "../DetailedUserPage.css"
import axios from 'axios'

const PortfolioOverview = () => {
    const [displayData, setCaptialUsed] = useState({
        capitalUsed: 0,
        portfolioValue: 0,
        profitLoss: 0,
        ready: false
    });

    async function getOverallData() {
        try {
            const overallDataPayload = await axios.post('user/getPortfolioSummary', {
                start: 'START'
            });
            console.log("overall");
            console.log(overallDataPayload);
            if (overallDataPayload.data.message === "no data") {
                console.log("no data here");
                setCaptialUsed(
                    {
                        capitalUsed: 0,
                        portfolioValue: 0,
                        profitLoss: 0,
                        ready: true,
                    }
                );
            } else {
                setCaptialUsed({
                    capitalUsed: overallDataPayload.data.capital_used,
                    portfolioValue: overallDataPayload.data.portfolio_value,
                    profitLoss: overallDataPayload.data.profit_loss,
                    ready: true
                });
            }
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        setInterval(function(){
            console.log("here");
            getOverallData();
        }, 25000)
    }, [])

    return (
        <>
        <div className="quick-facts">
            {displayData.ready && (
                <>
                    <span className="quick-facts-msg">Total Capital Used: ${displayData.capitalUsed.toFixed(2)}</span>
                    <span className="quick-facts-msg">Portfolio Value: ${displayData.portfolioValue.toFixed(2)}</span>
                    <span className="quick-facts-msg">Portfolio Profit/Loss: ${displayData.profitLoss.toFixed(2)}</span>
                </>
            )}
            {!displayData.ready && (
                <span className="quick-facts-msg">Data loading...</span>
            )}
        </div>
        </>
    )
}

export default PortfolioOverview