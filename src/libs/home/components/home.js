"use client";

import { ProjectList } from "./project-list"
import styles from "../home.module.css"
import Footer from "./footer"
import { useEffect, useState } from "react";
import { ROUTES } from "../routes";
import { useAppContext } from "@/libs/app-context";
import { ITEMS_PER_PAGE } from "./constants";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const [projectList, setProjectList] = useState(ROUTES);
    const { dispatchers: {
        setPage
    } } = useAppContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            const matchResults = ROUTES.filter(r =>
                r.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
            setProjectList(matchResults);
            setPage({
                currPage: 1,
                endPage: Math.ceil(matchResults.length / ITEMS_PER_PAGE)
            })
        }, 300)
        return () => clearTimeout(timer)
    }, [searchValue])

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
            <ProjectList projects={projectList} />
        </div>

        <Footer projects={projectList} />
    </div>
}
export default Home