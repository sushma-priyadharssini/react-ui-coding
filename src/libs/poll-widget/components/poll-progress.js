"use client";
import styles from "../poll.module.css";
import { usePollContext } from "../poll-context"
import { useState, useEffect } from "react"

const calculateProgress = (votes, totalVotes) => {
    return votes * 100 / totalVotes
}

const ProgressBar = ({ votes, showVotes }) => {
    const [startTransition, setStartTransition] = useState(false);

    const {
        state: {
            pollData: { totalVotes }
        },

    } = usePollContext();

    useEffect(() => {
        setStartTransition(true)
    }, [])

    return <div className={styles.progressContainer}>
        <div className={styles.progress} style={{
            ...(startTransition && showVotes ? { width: `${calculateProgress(votes, totalVotes)}%` } : {})
        }}>
        </div>
    </div>
}
export default ProgressBar

