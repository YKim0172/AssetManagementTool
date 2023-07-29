import React from 'react'
import "../DetailedUserPage.css"
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import UserNavbar from '../components/UserNavbar'
import welcome_back_bg from '../assets/welcome_back_background.jpg'
import AccountPiechart from '../components/AccountPiechart'
import AddGroupModal from '../components/AddGroupModal'
import Backdrop from '../components/Backdrop'
import Group from '../components/Group'
import axios from 'axios'
import PortfolioOverview from '../components/PortfolioOverview'

const DetailedUserPage = () => {
    const {ready, user, setUser} = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [listOfUserGroups, setListOfUserGroups] = useState([]);
    const [listOfUserTickers, setListOfUserTickers] = useState([]);
    //make list of names to send to account pie chart
    const listOfGroupNames = [];
    for (let i = 0; i < listOfUserGroups.length; i++) {
        listOfGroupNames.push(listOfUserGroups[i].category_name);
    }


    async function changeGroupsDisplayed() {
        const userGroups = await axios.post('/user/getGroups', {})
        setListOfUserGroups(userGroups.data);
    }

    async function changeTickersDisplayed() {
        const userTickers = await axios.post('/user/getTickersForGroup', {})
        setListOfUserTickers(userTickers.data);
    }

    useEffect(() => {
       changeGroupsDisplayed();
       changeTickersDisplayed();
    }, [])

    function openGroupModal() {
        setModalOpen(true);
    }

    function closeGroupModal() {
        setModalOpen(false);
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

  return (
    <>
    <div className="wrapper-main">
        <UserNavbar />

        <div className="wrapper-welcome-back" style={{backgroundImage: `url(${welcome_back_bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="welcome-msg-area">
                <span className="welcome-back-msg">Welcome back, {user?.name}</span>
            </div>
            <div className="mini-dashboard-area">
                <AccountPiechart />
                <PortfolioOverview />
            </div>
        </div>

        <div className="groups-bubble">
            <span className="my-groups-title">My Groups</span>
            <button className="add-group-btn" onClick={openGroupModal}>Add group</button>
        </div>


        <div className="wrapper-user-main">
            {listOfUserGroups.map((groupData, i) => {
                return <Group key={i} data={groupData} tickerList={listOfUserTickers[i]} updateListOfGroups={setListOfUserGroups} updateListOfTickers={setListOfUserTickers} />
            })}
        </div>

        {modalOpen && <Backdrop onClose={closeGroupModal} />}
        {modalOpen && <AddGroupModal onClose={closeGroupModal} updateListOfGroups={setListOfUserGroups}/>}
    </div>
    </>
  )
}

 /* <div className="user-categories-area">
{DATA.map((stock) => {
    return <Category />
})}
</div> */

export default DetailedUserPage