"use client";

import { ProjectList } from "./project-list"
import styles from "../home.module.css"
import Footer from "./footer"
import { useState } from "react";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");

    return <div className={styles.home}>
        <div className={styles.header}>
            <h1 className={styles.pageHeading}>React Nuggets</h1>
        </div>

        <div className={styles.navbar}>
            <input
                className={styles.searchbar}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
            />
        </div>

        <div className={styles.homeContent}>
            <ProjectList />
        </div>

        <Footer />
    </div>
}
export default Home