"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./otp.module.css"

const DIGITS = 4;

const OtpInput = () => {
    const [inputArr, setInputArr] = useState(Array.from({ length: DIGITS }, () => ''))
    const inputRef = useRef([])

    useEffect(() => {
        focusInput(0);
    }, [])

    const onChangeHandler = (value, index) => {
        if (isNaN(value)) return;
        setInputArr((prev) => {
            let updated = [...prev];
            updated[index] = value.slice(-1)
            return updated
        });
        if (value.trim()) {
            focusInput(index + 1)
        }
    }

    const focusInput = (index) => {
        if (index >= 0 && index <= 3) {
            inputRef.current[index]?.focus()
        }
    }

    const onKeyDownHandler = (ev, index) => {
        if (!ev.target.value && ev.key === "Backspace") {
            focusInput(index - 1)
        }
    }

    return <div className={styles.inputContainer}>
        {inputArr.map((input, index) => {
            return <input
                ref={(inp) => {
                    inputRef.current[index] = inp;
                }}
                type="text"
                // maxLength={1}
                inputMode="numeric"
                key={index}
                className={styles.box}
                value={inputArr[index]}
                onChange={(ev) => onChangeHandler(ev.target.value, index)}
                onKeyDown={(ev) => onKeyDownHandler(ev, index)}
            />
        })}
    </div>

}

export default OtpInput;