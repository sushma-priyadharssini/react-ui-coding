import styles from "./project-card.module.css"
import { FaGithub } from "react-icons/fa";
import { useAppContext } from "@/libs/app-context";
import { useRouter } from "next/navigation";

export const Card = ({ title, description, githubLink, deployLink }) => {
    const router = useRouter();
    const { dispatchers: { setCurrentProject } } = useAppContext();

    return (
        <div className={styles.card}>

            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                >
                    <FaGithub size={20} />
                </a>
            </div>

            <p className={styles.cardDescription}>{description}</p>

            {deployLink && (
                <button
                    className={styles.cardButton}
                    onClick={() => {
                        router.push(deployLink);
                        setCurrentProject(title);
                    }}
                >
                    View Project
                </button>
            )}
        </div>
    );
}
