import { useRef } from "react";
import styles from "../todo.module.css";

let AddTodo = (props) => {
    let newItemRef = useRef("");
    return (
        <div className={styles.inputContainer}>
            <input ref={newItemRef} className={styles.inputTextbox} />
            <button
                className={styles.addBtn}
                onClick={() => {
                    props.onAdd(newItemRef);
                    newItemRef.current.value = "";
                }}
            >
                Add
            </button>
        </div>
    );
};

export default AddTodo;
