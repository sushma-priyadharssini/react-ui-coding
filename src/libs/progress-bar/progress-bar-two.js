"use client";
import styles from "./progress-bar.module.css";
import { useState, useEffect } from 'react';

function ProgressBar() {
    const [startTransition, setStartTransition] = useState(false);

    useEffect(() => {
        // if (startTransition) {
        //     return;
        // }
        setStartTransition(true)
    }, [])

    return (
        <div className={`${styles.progressTransition} ${startTransition && styles.progressFilled}`}>
        </div>
    )
}

const ProgressBarTwo = () => {
    const [bars, setBars] = useState(0);

    const addHandler = () => {
        setBars((p) => p + 1);
    }

    return (
        <div className={styles.progressContainer}>
            {Array(bars).fill(null).map((_, id) => {
                return (
                    <div className={styles.barContainer} key={id}>
                        <ProgressBar />
                    </div>
                )
            })}
            <button onClick={addHandler}>Add</button>
        </div>
    );

}

export default ProgressBarTwo;