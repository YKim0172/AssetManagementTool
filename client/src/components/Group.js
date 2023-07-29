import React from 'react'
import "../group.css"
import trashcan from '../assets/trash.png'
import plus from '../assets/plus-icon.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Backdrop from './Backdrop'
import AddTickerModal from './AddTickerModal'
import { useEffect } from 'react'
import TickerEntry from './TickerEntry'
import CategoryPiechart from './CategoryPiechart'

const Group = ({data, tickerList, updateListOfGroups, updateListOfTickers}) => {
  const [tickerModalOpen, setTickerModalOpen] = useState(false);
  const [listOfTickers, setListOfTickers] = useState([]);
  const [isShown, setIsShown] = useState(false);

  // async function changeTickersDisplayed() {
  //   const tickers = await axios.post('/stockTicker/getAllStockTickers', {
  //     category_id: data._id
  //   });
  //   setListOfTickers(tickers.data);
  // }

  // useEffect(() => {
  //   changeTickersDisplayed();
  // }, [])

  function openTickerModal() {
    setTickerModalOpen(true);
  }
  
  function closeTickerModal() {
    setTickerModalOpen(false);
  }

  function showDetailMode() {
    setIsShown(true);
  }

  function showGraphMode() {
    setIsShown(false);
  }

  async function deleteGroup() {
    try {
      await axios.post('/category/deleteCategory', {
        user_id: data.creator,
        category_id: data._id
      });
      //call update list
      await axios.post('/stockTicker/calculateTickerPercentages', {
        user_id: data.creator,
        category_id: data._id
    })
      const userTickers = await axios.post('/user/getTickersForGroup', {})
      updateListOfTickers([...(userTickers.data)]);

      const userGroups = await axios.post('/user/getGroups', {})
      updateListOfGroups([...userGroups.data]);
    } catch (error) {
      console.log('couldnt delete the group');
    }
  }

  return (
    <div className="category-area">
      {!isShown && (
        <>
          <div className="modes-bubble">
            <Link className="modes-bubble-chosen-btn" onClick={showGraphMode}>
              Graph Mode
            </Link>
            <Link className="modes-bubble-btn" onClick={showDetailMode}>
              Detail Mode
            </Link>
          </div>
          <CategoryPiechart categoryID={data._id}/>
        </>
      )}
      {isShown && (
        <>
          <div className="modes-bubble">
            <Link className="modes-bubble-btn" onClick={showGraphMode}>
              Graph Mode
            </Link>
            <Link className="modes-bubble-chosen-btn" onClick={showDetailMode}>
              Detail Mode
            </Link>
          </div>
          <div className="group-bubble-header">
          <span className="group-name-text">
            {data.category_name}
          </span>
          <div className="delete-btn">
            <Link onClick={deleteGroup}>
              <img src={trashcan} className="img-delete-group-icon"></img>
            </Link>
          </div>
          <div className="add-btn">
            <Link onClick={openTickerModal}>
              <img src={plus} className="img-add-group-icon"></img>
            </Link>
          </div>
          </div>
          <div className="legend-bar">
            <span className="ticker-label">Ticker</span>
            <span className="quantity-label">Quantity</span>
            <span className="avg-price-label">Avg Price</span>
            <span className="percent-group-label">% of Group</span>
            <span className="percent-portfolio-label">% of Portfolio</span>
          </div>
          <div className="group-content-wrapper">
              {tickerList?.map((tickerData, i) => {
                return <TickerEntry key={i} ticker={tickerData.ticker} quantity={tickerData.quantity_bought}
                                    avgPrice={tickerData.avg_price_bought} percent_group={tickerData.percent_group}
                                    percent_portfolio={tickerData.percent_portfolio} tickerID={tickerData._id}
                                    categoryID={tickerData.category} userID={data.creator}
                                    updateListOfTickers={updateListOfTickers} updateListOfGroups={updateListOfGroups}/>
              })}
          </div>
          {tickerModalOpen && <Backdrop onClose={closeTickerModal} />}
          {tickerModalOpen && <AddTickerModal onClose={closeTickerModal} userID={data.creator} categoryID={data._id} updateListOfTickers={updateListOfTickers} updateListOfGroups={updateListOfGroups}/>}
        </>
      )}
    </div>
  )
}

export default Group

//<span>{props.data.category_name}</span>

//<img src={trashcan} className="img-delete-group-icon"></img>