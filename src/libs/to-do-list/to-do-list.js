"use client";
import { useState } from 'react';
import styles from "./todo.module.css"

const ToDoList = () => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);

    const submitHandler = () => {
        setList((prev) => prev.concat(value));
        setValue("")
    }

    const deleteHandler = (ev) => {
        const itemToRemove = ev.target.getAttribute("data-item");
        setList(list.filter(l => l !== itemToRemove));
    }

    return (
        <>
            <h1>Todo List</h1>
            <div className={styles.inputContainer}>
                <input
                    value={value}
                    type="text"
                    placeholder="Add your task"
                    onChange={(ev) => setValue(ev.target.value)}
                />
                <div>
                    <button onClick={submitHandler}>Submit</button>
                </div>
            </div>
            <ul onClick={deleteHandler}>
                {list.map((item, idx) => {
                    return (
                        <li key={idx} id={item}>
                            <span>{item}</span>{" "}
                            <button data-item={item}>Delete</button>
                        </li>
                    )
                }
                )}
            </ul>
        </>
    );
}

export default ToDoList;