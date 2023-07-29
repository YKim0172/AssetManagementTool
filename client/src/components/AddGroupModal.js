import React from 'react'
import '../modals.css'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'

const AddGroupModal = (props) => {
  const [newGroup, setNewGroup] = useState();
  const {ready, user} = useContext(UserContext);
  const logged_in_id = user._id;

  async function createNewGroup(ev) {
    ev.preventDefault();
    try {
      await axios.post('/category/createCategory', {
        creator: logged_in_id,
        category_name: newGroup,
      });
      console.log('success');
      //get list of categories
      const userGroups = await axios.post('/user/getGroups', {})
      console.log(userGroups);
      props.updateListOfGroups(userGroups.data);
      props.onClose();
    } catch (error) {

      console.log('err');
    }
  }

  return (
    <div className="add-group-modal-box">
      <form className="new-group-form" onSubmit={createNewGroup}>
        <span className="new-group-form-instruction">What do you want to call your new group?</span>
        <input className="new-group-name-input" required type="text" placeholder='Enter name of group' value={newGroup} onChange={ev => setNewGroup(ev.target.value)}/>
        <button className="make-new-group-submit-btn">Make new group!</button>
      </form>
    </div>
  )
}

export default AddGroupModal