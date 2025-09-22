"use client";
import { POLLS } from "./poll-data";
import styles from "./poll.module.css";
import { useEffect, useState } from "react"

const calculateProgress = (votes, totalVotes) => {
    return votes * 100 / totalVotes
}

const ProgressBar = ({ votes, showVotes, totalVotes }) => {
    const [startTransition, setStartTransition] = useState(false);

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

const PollOption = ({
    label,
    id,
    handleSelection,
    count,
    showVotes,
    totalVotes,
    userSelected }) => {
    return <div className={styles.pollOption}>
        <label className={styles.pollLabel}>{label}</label>
        <div className={styles.pollItem}>
            <input
                type="checkbox"
                name={label}
                value={label}
                checked={userSelected.includes(id)}
                onChange={() => { handleSelection(id) }}
                className={styles.pollBtn}
            />
            <ProgressBar showVotes={showVotes}
                votes={count} totalVotes={totalVotes} />
        </div>
    </div>
}

const PollWidget = () => {
    let [showVotes, setShowVotes] = useState(false) // calculate initial value from server
    let [options, setOptions] = useState(POLLS.options);
    let [totalVotes, setTotalVotes] = useState(POLLS.totalVotes);
    let [userSelected, setUserSelected] = useState([]);

    const onSelectOptionHandler = (selectedId) => {
        setUserSelected((prev) => ([...prev, selectedId]))
    }

    const submitHandler = () => {
        setTotalVotes((prev) => prev + userSelected.length)
        setOptions((prev) =>
            prev.map(p => (
                userSelected.includes(p.id) ? { ...p, count: p.count + 1, userVotedForOption: true } : p
            )))
        // fire api with required update
        setShowVotes(true)
    }

    return <div className={styles.pollContainer}>
        {options.map((option) => {
            return <PollOption
                key={option.id}
                {...option}
                showVotes={showVotes}
                totalVotes={totalVotes}
                handleSelection={onSelectOptionHandler}
                userSelected={userSelected} />
        })}
        <button className={styles.submit} onClick={submitHandler}>Submit</button>
    </div>
}

export default PollWidget;