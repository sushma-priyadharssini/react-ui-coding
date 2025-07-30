"use client";
import styles from "./progress-bar.module.css";

const ProgressBarOne = () => {
    const value = 10;
    const progress = Math.max(Math.min(value, 100), 0)

    return <div className={styles.progress}>
        {!!progress && (
            <div className={styles.completed} style={{ width: `${progress}%` }}>
                {`${value}%`}
            </div>
        )}
    </div>

}

export default ProgressBarOne;