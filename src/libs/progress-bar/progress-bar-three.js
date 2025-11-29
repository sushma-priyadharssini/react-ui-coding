"use client";
import styles from "./progress-bar.module.css";
import { useState, useEffect, useRef } from 'react';

const LIMIT = 3;
const PERCENTAGE = 90;
const PROGRESS_DURATION = 5000;

function ProgressBar({ requestSlot, releaseSlot, barId }) {
    const [startTransition, setStartTransition] = useState(false);

    useEffect(() => {
        let timer
        requestSlot(barId).then(() => {
            setStartTransition(true);

            timer = setTimeout(() => {
                releaseSlot(barId);
            }, PROGRESS_DURATION);
        });
        return () => clearTimeout(timer);
    }, [])

    return (
        <div
            className={`${styles.progressTransition}`}
            style={{
                width: startTransition ? `${PERCENTAGE}%` : "0%",
                transition: `width ${PROGRESS_DURATION}ms linear`
            }}>
        </div>
    )
}

const ProgressBarThree = () => {
    const [bars, setBars] = useState([]);
    const [activeCount, setActiveCount] = useState(0);

    // const requestSlot = () => {
    //     return new Promise(resolve => {
    //         setActiveCount(c => {
    //             if (c < LIMIT) {
    //                 resolve(true);
    //                 return c + 1
    //             }
    //             const interval = setInterval(() => {
    //                 setActiveCount((lc) => {
    //                     if (lc < LIMIT) {
    //                         clearInterval(interval);
    //                         resolve(true);
    //                         return lc + 1
    //                     }
    //                     return lc
    //                 })
    //             }, 100)
    //             return c
    //         })
    //     });
    // };

    // const releaseSlot = () => setActiveCount(c => c - 1);

    // const addHandler = () => {
    //     setBars((p) => p + 1);
    // }

    const requestSlot = (barId) => {
        return new Promise(resolve => {
            setBars(prev => {
                const running = prev.filter(b => b.status === "running").length;

                // If slot available → approve immediately
                if (running < LIMIT) {
                    resolve(true);
                    return prev.map(b =>
                        b.id === barId
                            ? { ...b, status: "running" }
                            : b
                    );
                }
                const interval = setInterval(() => {
                    setBars(prev => {
                        const running = prev.filter(b => b.status === "running").length;
                        if (running < LIMIT) {
                            clearInterval(interval)
                            resolve(true);
                            return prev.map(b =>
                                b.id === barId
                                    ? { ...b, status: "running" }
                                    : b
                            );
                        }
                        return prev
                    })
                }, 100)
                return prev
            })
        });
    }


    const releaseSlot = (barId) => {
        setBars((prev) => {
            return prev.map(b => {
                if (b.id === barId) {
                    return { ...b, status: "done" }
                }
                return b
            })
        });
    }

    const addHandler = () => {
        setBars((prev) => {
            return [
                ...prev,
                { id: Date.now(), status: "waiting" }
            ]
        });
    }


    return (
        <div className={styles.progressContainer}>
            <div className={styles.actionContainer}>
                <button className={styles.addButton} onClick={addHandler}>Add</button>
                <span>{`Limit: ${LIMIT}`}</span>
            </div>

            {/* {Array(bars).fill(null).map((_, id) => { */}
            {bars.map(bar => {
                const { id } = bar
                return (
                    <div className={styles.barContainer} key={id}>
                        <ProgressBar barId={id} requestSlot={requestSlot} releaseSlot={releaseSlot} />
                    </div>
                )
            })}
        </div>
    );

}

export default ProgressBarThree;
