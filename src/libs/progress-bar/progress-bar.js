"use client";
import ProgressBarOne from "./progress-bar-one";
import ProgressBarTwo from "./progress-bar-two";
import ProgressBarThree from "./progress-bar-three"

const ProgressBar = () => {

    return <>
        <h3>{"Progress Bar 1"}</h3>
        <ProgressBarOne />

        <h3>{"Progress Bar 2"}</h3>
        <ProgressBarTwo />

        <h3>{"Progress Bar 3"}</h3>
        <ProgressBarThree />
    </>
}

export default ProgressBar;