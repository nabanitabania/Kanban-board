import React, {useState, useEffect} from "react";
import Column from "../column/column";
import './my-board.css';
import axios from 'axios';


const MyBoard = () => {

    const [columns, setColumns] = useState([]);

    const getColumns = async () => {
        await axios.get('http://localhost:5000/api/columns')
          .then(response => {
            setColumns(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }

    useEffect(() => {
        getColumns();
    }, []);

    const updateColumnTitle = (oldTitle, newTitle) => {
        const index = columns.indexOf(oldTitle);
        const leftColumns = columns.slice(0, index);
        const rightColumns = columns.slice(index+1);
        setColumns([...leftColumns, newTitle, ...rightColumns]);
    }

    const addColumnRightHandler = (columnTitle) => {
        const newColumn = prompt("Enter new column name");
        const index = columns.indexOf(columnTitle);
        const leftColumns = columns.slice(0, index+1);
        const rightColumns = columns.slice(index+1);
        setColumns([...leftColumns, newColumn, ...rightColumns]);
    }

    const deleteHandler = (columnToDelete) => {
        const filteredColumns = columns.filter(column => column !== columnToDelete);
        setColumns(filteredColumns);
    }
    
    return (
        <div className="my-board">
            <div className="board-title">Kanban Board</div>
            <div className="board-content">
                {columns.map((columnTitle,index) => (
                    <Column key={index} columnTitle={columnTitle} addColumnRightHandler={addColumnRightHandler} updateColumnTitle={updateColumnTitle} deleteHandler={deleteHandler}/>
                ))}
            </div>
        </div>
    );
} 
export default MyBoard;