import React from 'react'
import { useState } from 'react';
import '../modals.css'
import axios from 'axios';

const EditTickerModal = ({onClose, tickerID, userID, categoryID, updateListOfTickers, updateListOfGroups}) => {
    const [newQuantity, setNewQuantity] = useState();
    const [newPrice, setNewPrice] = useState();

    async function editTicker(ev) {
        ev.preventDefault();
        try {
            await axios.post('stockTicker/editStockTicker', {
                ticker_id: tickerID,
                new_quantity: newQuantity,
                new_price: newPrice
            });
            //update all calculations
            await axios.post('/stockTicker/calculateTickerPercentages', {
                user_id: userID,
                category_id: categoryID
            })
            //update list to show
            const userTickers = await axios.post('/user/getTickersForGroup', {})
            updateListOfTickers([...(userTickers.data)]);

            const userGroups = await axios.post('/user/getGroups', {});
            updateListOfGroups([...(userGroups.data)]);
            onClose();

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="add-ticker-modal-box" onSubmit={editTicker}>
        <form className="new-ticker-form">
            <span className="new-ticker-form-prompt">Enter new quantity bought</span>
            <input className="new-ticker-form-input" required type="number" placeholder='Enter Quantity Bought' value={newQuantity} onChange={ev => setNewQuantity(ev.target.value)} />
            <span className="new-ticker-form-prompt">Enter new average price per share</span>
            <input className="new-ticker-form-input" required type="number" step=".01" placeholder='Average cost per share bought' value={newPrice} onChange={ev => setNewPrice(ev.target.value)} />
            <button className="make-new-group-submit-btn">Update Ticker</button>
        </form>
    </div>
  )
}

export default EditTickerModal