"use client";
import { ROUTES } from "../../routes"
import { Card } from "../project-card"
import styles from "./project.module.css"
import { ITEMS_PER_PAGE } from "../constants";
import { useAppContext } from "../context/app-context";


export const ProjectList = () => {
    const { pagination: { page } } = useAppContext();
    const startIndex = (page.currPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, ROUTES.length);
    const filteredPages = ROUTES.slice(startIndex, endIndex);

    return <nav>
        <ul className={styles.gridContainer}>
            {filteredPages.map((app) => {
                const { name, description, path, github } = app;
                return <Card
                    key={path}
                    title={name}
                    description={description}
                    githubLink={github}
                    deployLink={path} />
            })}
        </ul>
    </nav>
}