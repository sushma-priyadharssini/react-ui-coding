"use client";
import { useState } from 'react'
import styles from "./dice.module.css"
import { DICE_FACE_DOT_POSITIONS } from "./constants"

const Dice = ({ number }) => {
    return <div className={styles.dice}>
        {DICE_FACE_DOT_POSITIONS[number].map((dotStyle, idx) => {
            return <div key={idx} className={`${styles.circle} ${styles[dotStyle]}`}></div>
        })}
    </div>
}


const DiceRoller = () => {
    const [dice, setDice] = useState();
    const [res, setRes] = useState([]);
    console.log(res)

    const rollHandler = (ev) => {
        ev.preventDefault();
        let randomNumberList = Array.from({ length: dice }, () =>
            Math.max(Math.ceil(Math.random() * 6), 1),
        )
        setRes(randomNumberList);
    }

    return <div>
        <div>
            <form onSubmit={rollHandler} className={styles.inputContainer}>
                <input
                    type="number"
                    value={dice}
                    onChange={(ev) => setDice(ev.target.value)}>
                </input>
                <button type="submit">Roll</button>
            </form>
        </div>
        <div className={styles.resultContainer}>
            {res.length > 0 && res.map((r, idx) => {
                return <Dice key={idx} number={r} />
            })}
        </div>
    </div>

}

export default DiceRoller;