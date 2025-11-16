"use client";
import { Card } from "../project-card"
import styles from "./project.module.css"
import { ITEMS_PER_PAGE } from "../constants";
import { useAppContext } from "@/libs/app-context";
import { useEffect, useRef } from "react";


export const ProjectList = ({ projects }) => {
    const { pagination: { currentPage } } = useAppContext();
    const projectListRef = useRef(null);

    useEffect(() => {
        if (projectListRef.current) {
            projectListRef.current.scrollTo({
                top: 0,
                behavior: "auto",
            });
        }
    }, [currentPage]);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, projects.length);
    const filteredPages = projects.slice(startIndex, endIndex);

    return <nav ref={projectListRef} className={styles.projectList}>
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