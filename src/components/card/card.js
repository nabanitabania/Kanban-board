import React, { useEffect, useState } from 'react';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const Card = ({id, title, description, addCardHandler, deleteCardHandler }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(description);
    const [newTitle, setNewTitle] = useState(title);

    useEffect(() => {
        if(title === "" || description === "") {
            setIsEditing(true);
        }
    }, [title, description])

    const editingHandler = () => {
        setIsEditing(!isEditing);
    }

    const saveHandler = () => {
        setIsEditing(!isEditing);
        const newCardData = {
            id: id,
            title: newTitle,
            description: newDescription
        }
        addCardHandler(newCardData);
    }

    const changeTitleHandler = (e) => {
        e.preventDefault();
        setNewTitle(e.target.value);
    }

    const changeDescriptionHandler = (e) => {
        e.preventDefault();
        setNewDescription(e.target.value);
    }
    
    return <div className="card">
            <div className='title'>
                {isEditing ?
                    <input value={newTitle} onChange={changeTitleHandler}/> 
                : newTitle}
            </div>
            <div className='card-content'>
                <div className='card-description'>
                    {isEditing ? 
                    <textarea value={newDescription} onChange={changeDescriptionHandler}></textarea> :
                    newDescription}
                </div>
                <div className='card-actions'>
                    {isEditing ? 
                    <FontAwesomeIcon className='save' icon={faCircleCheck} onClick={saveHandler}/> :
                    <>
                        <FontAwesomeIcon className='edit' icon={faPenToSquare} onClick={editingHandler}/>
                        <FontAwesomeIcon className='delete' icon={faTrash} onClick={() => deleteCardHandler(id)}/>
                    </>}
                </div>
            </div>
        </div>
}

export default Card;