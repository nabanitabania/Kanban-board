import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddCard = ({addNewCardHandler}) => {
    return  <div className="add-card">
                 <button onClick={addNewCardHandler}><FontAwesomeIcon className="add" icon={faPlus} /></button>
            </div>
}

export default AddCard;