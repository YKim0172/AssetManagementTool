import React from 'react'
import "../group.css"
import edit from "../assets/pencil-edit-icon.png"
import remove_entry from "../assets/x_icon.png"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import EditTickerModal from './EditTickerModal'
import Backdrop from './Backdrop'
const TickerEntry = ({ticker, quantity, avgPrice, percent_group, percent_portfolio , tickerID, categoryID, userID, updateListOfTickers, updateListOfGroups}) => {

    const [editModalOpen, setEditModalOpen] = useState(false);

    function openEditModal() {
        setEditModalOpen(true);
    }

    function closeEditModal() {
        setEditModalOpen(false);
    }

    async function deleteTicker() {
        try {
            await axios.post('stockTicker/deleteStockTicker', {
                ticker_id: tickerID
            });
            //recalculate
            await axios.post('/stockTicker/calculateTickerPercentages', {
                user_id: userID,
                category_id: categoryID
            })

            const userTickers = await axios.post('/user/getTickersForGroup', {})
            updateListOfTickers([...(userTickers.data)]);

            const userGroups = await axios.post('/user/getGroups', {});
            updateListOfGroups([...(userGroups.data)]);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="ticker-wrapper">
        <span className="entry-label">{ticker}</span>
        <span className="entry-label">{quantity}</span>
        <span className="entry-label">{avgPrice}</span>
        <span className="entry-label">{percent_group}</span>
        <span className="entry-label">{percent_portfolio}</span>
        <div className="edit-entry-btn">
            <Link onClick={openEditModal}>
                <img src={edit} className="img-edit-entry-icon"></img>
            </Link>
        </div>
        <div className="edit-entry-btn">
            <Link onClick={deleteTicker}>
                <img src={remove_entry} className="img-edit-entry-icon"></img>
            </Link>
        </div>
        {editModalOpen && <Backdrop onClose={closeEditModal} />}
        {editModalOpen && <EditTickerModal onClose={closeEditModal} tickerID={tickerID} userID={userID} categoryID={categoryID} updateListOfTickers={updateListOfTickers} updateListOfGroups={updateListOfGroups} />}
    </div>
  )
}

export default TickerEntry