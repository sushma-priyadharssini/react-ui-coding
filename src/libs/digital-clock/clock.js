"use client";
import { useEffect, useState } from 'react'

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

    const displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    return <div>
        {displayTime}
    </div>

}

export default AnalogClock;