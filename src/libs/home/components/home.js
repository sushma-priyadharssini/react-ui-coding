"use client";

import { ProjectList } from "./project-list"
import styles from "../home.module.css"
import Footer from "./footer"
import { AppContextProvider } from "./context/app-context"

const Home = () => {
    return <AppContextProvider>
        <div className={styles.home}>
            <div className={styles.header}>
                <h1 className={styles.pageHeading}>React Nuggets</h1>
            </div>

            <div className={styles.homeContent}>
                <ProjectList />
            </div>

            <Footer />
        </div>

    </AppContextProvider>
}
export default Home