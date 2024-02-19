import React, {useState} from "react";
import Column from "../column/column";
import './my-board.css';


const MyBoard = () => {

    const [columns, setColumns] = useState(["To Do", "In Progress", "Done"]);

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