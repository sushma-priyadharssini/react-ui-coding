"use client";
import Layout from "@/libs/layout";
import ProgressBarOne from "./progress-bar-one";
import ProgressBarTwo from "./progress-bar-two";

const ProgressBar = () => {

    return <Layout>
        <div>{"Progress Bar 1"}</div>
        <ProgressBarOne />

        <div>{"Progress Bar 2"}</div>
        <ProgressBarTwo />
    </Layout>
}

export default ProgressBar;