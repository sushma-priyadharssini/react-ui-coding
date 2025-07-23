"use client";
import { useEffect, useState } from 'react'
import Layout from "@/libs/layout"
import styles from "./clock.module.css"

function Hand({ angle, width = 1, height = 1 }) {
    return (
        <div
            className={styles.clockHand}
            style={{ transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})` }}
        />
    )
}

const useTimeGenerator = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        let timerId = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return (() => {
            clearInterval(timerId)
        })
    })

    return time;
}


const AnalogClock = () => {
    const time = useTimeGenerator();
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hoursAngle = hours / 12 * 360;
    const minutesAngle = minutes / 60 * 360;
    const secondsAngle = seconds / 60 * 360;

    return <Layout>
        <div className={styles.clock}>
            <Hand height={0.5} width={5} angle={hoursAngle} />
            <Hand height={0.8} width={3} angle={minutesAngle} />
            <Hand height={0.8} width={1} angle={secondsAngle} />
        </div>
    </Layout>

}

export default AnalogClock;