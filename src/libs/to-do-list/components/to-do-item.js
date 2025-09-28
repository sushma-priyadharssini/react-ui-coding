import styles from "../todo.module.css";
import { useState } from "react";

let TodoItem = (props) => {
    const [selected, setSelected] = useState(false);
    console.log(selected);
    return (
        <div className={styles.itemCard}>
            <div
                className={`${styles.itemHolder} ${selected ? styles.selected : styles.unselected
                    }`}
                onClick={() => setSelected((prevState) => !prevState)}
            >
                {props.item.name}
            </div>
            <button onClick={() => props.onDelete(props.item.id)} className={styles.deleteButton}>Delete</button>
        </div>
    );
};

export default TodoItem;
