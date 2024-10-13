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

        if(newCardData.title !== "" && newCardData.description !== "") {
            addCardHandler(newCardData);
        }
    }

    const changeTitleHandler = (e) => {
        e.preventDefault();
        if(e.target.value !== "") {
            setNewTitle(e.target.value);
        }     
    }

    const changeDescriptionHandler = (e) => {
        e.preventDefault();
        if(e.target.value !== "") {
            setNewDescription(e.target.value);
        }
    } 

    let showCard = false;
    
    if(isEditing) {
        showCard = true;
    } else {
        showCard = title !== "" && description !== "";
    }
 
    return showCard ? <div className="card" onDragStart={(e)=>{console.log(e)}} onDragLeave={(e)=>{console.log(e)}} draggable>
            <div className='title'>
                {isEditing ?
                    <input value={newTitle} onChange={changeTitleHandler} placeholder='Enter Title'/> 
                : newTitle}
            </div>
            <div className='card-content'>
                <div className='card-description'>
                    {isEditing ? 
                    <textarea value={newDescription} onChange={changeDescriptionHandler} placeholder='Enter Description'></textarea> :
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
        </div> : null;
}

export default Card;