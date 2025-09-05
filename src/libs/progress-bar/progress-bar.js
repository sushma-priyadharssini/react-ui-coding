"use client";
import ProgressBarOne from "./progress-bar-one";
import ProgressBarTwo from "./progress-bar-two";

const ProgressBar = () => {

    return <>
        <div>{"Progress Bar 1"}</div>
        <ProgressBarOne />

        <div>{"Progress Bar 2"}</div>
        <ProgressBarTwo />
    </>
}

export default ProgressBar;