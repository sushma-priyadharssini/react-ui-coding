"use client";
import { useState, useEffect } from 'react';
import styles from "./grid.module.css"


const GridLights = () => {
    const [lights, setLights] = useState([]);

    useEffect(() => {
        let timer;
        if (lights.length === 8) {
            //reset the lights
            timer = setInterval(() => {
                setLights((prevLights) => {
                    const newOrder = [...prevLights];
                    newOrder.pop();
                    if (newOrder.length === 0) {
                        clearInterval(timer);
                    }
                    return newOrder;
                });

            }, 500);
        }
    }, [lights])

    const gridClickHandler = (ev) => {
        const cellId = ev.target.id;
        if (cellId !== 'r1c1') {
            setLights((prevLights) => [...prevLights, cellId]);
        }
    }


    return <table className={styles.grid}>
        <tbody>
            {Array.from({ length: 3 }, () => 0).map((_, rowIndex) => (
                <tr key={rowIndex} onClick={gridClickHandler}>
                    {Array.from({ length: 3 }, () => 0).map((_, colIndex) => {
                        const cellId = `r${rowIndex}c${colIndex}`;
                        const isMidCell = cellId === 'r1c1';
                        return (
                            <td key={cellId} id={cellId}
                                className={`${isMidCell ? "" : styles.light} ${lights.includes(cellId) ? styles.lightOn : styles.lightOff}`}>
                            </td>

                        );
                    })}
                </tr>
            ))}
        </tbody>
    </table>
}

export default GridLights