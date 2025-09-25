"use client";
import styles from "../poll.module.css";
import { useEffect, useState } from "react"
import { PollContextProvider, usePollContext } from "../poll-context"
import PollOption from "./poll-option"
import { POLLS } from "../poll-data"

const PollWidget = () => {
    let [showVotes, setShowVotes] = useState(false)
    const { state: { pollData, selectedOptions }, dispatchers: { setPollData, setSelectedOptions } } = usePollContext()


    useEffect(() => {
        // ✅ Only run on client
        const mockFetch = () => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(POLLS),
        });

        // Override fetch temporarily
        const originalFetch = global.fetch;
        global.fetch = mockFetch;

        // Call fetch
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                setPollData(data)
            });

        // Restore original fetch when component unmounts
        return () => {
            global.fetch = originalFetch;
        };
    }, [])


    const onSelectOptionHandler = (selectedId) => {
        setSelectedOptions([...selectedOptions, selectedId])
    }

    const submitHandler = () => {
        setPollData({
            ...pollData,
            totalVotes: pollData.totalVotes + 1,
            options: pollData.options.map(p => (
                selectedOptions.includes(p.id) ? { ...p, count: p.count + 1, userVotedForOption: true } : p
            ))
        })
        // fire api with required update
        setShowVotes(true)
    }

    return <div className={styles.pollContainer}>
        {pollData.options.map((option) => {
            return <PollOption
                key={option.id}
                {...option}
                showVotes={showVotes}
                handleSelection={onSelectOptionHandler} />
        })}
        <button className={styles.submit} onClick={submitHandler}>Submit</button>
    </div>
}

const PollWidgetContainer = () => {
    return <PollContextProvider>
        <PollWidget />
    </PollContextProvider>

}

export default PollWidgetContainer;