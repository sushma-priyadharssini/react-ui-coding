"use client";
import { ROUTES } from "../../routes"
// import Link from 'next/link'
import { Card } from "../project-card"
import styles from "./project.module.css"


export const ProjectList = () => {
    {/* <Link href={link.path} className="nav-link">{link.name}</Link> */ }
    return <nav>
        <ul className={styles.gridContainer}>
            {ROUTES.map((app) => {
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