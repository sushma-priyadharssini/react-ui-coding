"use client";
import styles from "./progress-bar.module.css";
import { useState, useEffect } from 'react';

const PERCENTAGE = 100;
const PROGRESS_DURATION = 5000;

function ProgressBar() {
    const [startTransition, setStartTransition] = useState(false);

    useEffect(() => {
        // if (startTransition) {
        //     return;
        // }
        setStartTransition(true)
    }, [])

    return (
        <div className={`${styles.progressTransition} ${startTransition && styles.progressFilled}`}
            style={{
                width: startTransition ? `${PERCENTAGE}%` : "0%",
                transition: `width ${PROGRESS_DURATION}ms linear`
            }}>
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
            <div className={styles.actionContainer}>
                <button className={styles.addButton} onClick={addHandler}>Add</button>
            </div>
            {Array(bars).fill(null).map((_, id) => {
                return (
                    <div className={styles.barContainer} key={id}>
                        <ProgressBar />
                    </div>
                )
            })}
        </div>
    );

}

export default ProgressBarTwo;