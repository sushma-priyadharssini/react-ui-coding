"use client";
import styles from "./progress-bar.module.css";
import Layout from "@/libs/layout";

const ProgressBarOne = () => {
    const value = 10;
    const progress = Math.max(Math.min(value, 100), 0)

    return <Layout>
        <div>{"Progress Bar 1"}</div>
        <div className={styles.progress}>
            {!!progress && (
                <div className={styles.completed} style={{ width: `${progress}%` }}>
                    {`${value}%`}
                </div>
            )}
        </div>
    </Layout>
}

export default ProgressBarOne;