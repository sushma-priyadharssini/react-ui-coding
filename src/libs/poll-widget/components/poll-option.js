"use client";
import styles from "../poll.module.css";
import { usePollContext } from "../poll-context"
import ProgressBar from "./poll-progress"

const PollOption = ({
    label,
    id,
    handleSelection,
    count,
    showVotes
}) => {

    const {
        state: {
            selectedOptions
        },

    } = usePollContext();

    return <div className={styles.pollOption}>
        <label className={styles.pollLabel}>{label}</label>
        <div className={styles.pollItem}>
            <input
                type="checkbox"
                name={label}
                value={label}
                checked={selectedOptions.includes(id)}
                onChange={() => { handleSelection(id) }}
                className={styles.pollBtn}
            />
            <ProgressBar showVotes={showVotes} votes={count} />
        </div>
    </div>
}

export default PollOption
