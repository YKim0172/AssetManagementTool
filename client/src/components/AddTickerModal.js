import React from 'react'
import '../modals.css'
import { useState } from 'react'
import axios from 'axios'

const AddTickerModal = (props) => {
    const [ticker, setTicker] = useState();
    const [quantity, setQuantity] = useState();
    const [priceBought, setPriceBought] = useState();

    async function addTickerEntry(ev) {
        ev.preventDefault();
        try {
            await axios.post('/stockTicker/createStockTicker', {
                user_id: props.userID,
                category_id: props.categoryID,
                ticker: ticker,
                avg_price: priceBought,
                quantity: quantity
            });
            console.log('success');
            await axios.post('/stockTicker/calculateTickerPercentages', {
                user_id: props.userID,
                category_id: props.categoryID
            })
            console.log("calculated");
            //all the calculations are in the backend, so now make the calls to display the new data.
            props.onClose();

            const userTickers = await axios.post('/user/getTickersForGroup', {})
            props.updateListOfTickers([...(userTickers.data)]);

            const userGroups = await axios.post('/user/getGroups', {});
            props.updateListOfGroups([...(userGroups.data)]);

        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className="add-ticker-modal-box" onSubmit={addTickerEntry}>
        <form className="new-ticker-form">
            <span className="new-ticker-form-prompt">Enter ticker symbol</span>
            <input className="new-ticker-form-input" required type="text" placeholder='Enter Ticker (ex: AAPL)' value={ticker} onChange={ev => setTicker(ev.target.value)} />
            <span className="new-ticker-form-prompt">Enter the quantity bought</span>
            <input className="new-ticker-form-input" required type="number" placeholder='Enter Quantity Bought' value={quantity} onChange={ev => setQuantity(ev.target.value)} />
            <span className="new-ticker-form-prompt">Enter average price per share</span>
            <input className="new-ticker-form-input" required type="number" step=".01" placeholder='Average cost per share bought' value={priceBought} onChange={ev => setPriceBought(ev.target.value)} />
            <button className="make-new-group-submit-btn">Add ticker</button>
        </form>
    </div>
  )
}

export default AddTickerModal