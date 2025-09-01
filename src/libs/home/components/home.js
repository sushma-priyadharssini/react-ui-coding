"use client";

import { ProjectList } from "./project-list"
import React from 'react'
import styles from "../home.module.css"



const Home = () => {
    return <div>
        <div className={styles.header}>
            <h1 className={styles.pageHeading}>React Nuggets</h1>
        </div>
       
        <ProjectList />
    </div>
}
export default Home