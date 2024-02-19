import React, { useState } from "react";
import Card from "../card/card";
import './column.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import AddCard from "../add-card/add-card";

const Column = ({ columnTitle, addColumnRightHandler, updateColumnTitle, deleteHandler}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState(columnTitle);
    const [cards, setCards] = useState([])

    const addCardHandler = (data) => {
        if(!data) {
            const newCard = {
                id: cards.length + 1,
                title: "",
                description: ""
            }
            setCards([...cards, newCard]);
        } else {
            console.log(data);
            const filteredCardData = cards.filter(card => card.id !== data.id);
            setCards([...filteredCardData, data])
        }
        
    }

    const deleteCardHandler = (id) => {
        const filteredCardData = cards.filter(card => card.id !== id);
        setCards(filteredCardData);
    }

    const addNewCardHandler = () => {
        addCardHandler();
    }

    const changeTitleHandler = (e) => {
        e.preventDefault();
        setNewColumnTitle(e.target.value);
    }

    const saveHandler = () => {
        setIsEditing(!isEditing);
        updateColumnTitle(columnTitle, newColumnTitle);
    }

    return (
        <div className="column">
            <div className="column-header">
                <div className="column-title">
                    {isEditing ? 
                    <input value={newColumnTitle} onChange={changeTitleHandler}/>
                    :columnTitle}
                    <span className="card-count">{cards.length}</span>
                </div>
                <div className="modify-column">
                    {isEditing ?
                        <button onClick={saveHandler}><FontAwesomeIcon className="save" icon={faCircleCheck} /></button> :
                        <button onClick={() => {setIsEditing(!isEditing)}}><FontAwesomeIcon className="edit" icon={faPenToSquare} /></button>}
                    <button onClick={() => addColumnRightHandler(columnTitle)}><FontAwesomeIcon className="add" icon={faPlus} /></button>
                    <button onClick={() => deleteHandler(columnTitle)}><FontAwesomeIcon className="delete" icon={faTrash} /></button>
                </div>
            </div>
            {cards.map(({id, title, description}) => (
                <Card key={id} id={id} title={title} description={description} addCardHandler={addCardHandler} deleteCardHandler={deleteCardHandler}/>
            ))}
            <AddCard addNewCardHandler={addNewCardHandler}/>
        </div>
    );
}

export default Column;