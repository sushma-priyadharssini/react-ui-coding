"use client";
import styles from "../todo.module.css"
import AddTodo from "./add-to-do";
import TodoItem from "./to-do-item";
import { useState } from "react";

const ITEMS = [
    { id: 1, name: "Item1" },
    { id: 2, name: "Item2" },
    { id: 3, name: "Item3" }
];


const ToDoList = () => {
    const [todoItems, setTodoItems] = useState(ITEMS);
    let onAddHandler = (itemName) => {
        let itemObj = {
            id: new Date().getTime(),
            name: itemName.current.value
        };
        setTodoItems((prevItems) => {
            return [...prevItems, itemObj];
        });
    };
    let onDeleteHandler = (id) => {
        let currItems = [...todoItems];
        let itemToDeleteIndex = currItems.findIndex((item) => item.id === id);
        currItems.splice(itemToDeleteIndex, 1);
        setTodoItems(currItems);
    };
    return (
        <div className={styles.container}>
            <AddTodo onAdd={onAddHandler} />
            {todoItems.map((item) => {
                return (
                    <TodoItem key={item.id} item={item} onDelete={onDeleteHandler} />
                );
            })}
        </div>
    );
}

export default ToDoList;