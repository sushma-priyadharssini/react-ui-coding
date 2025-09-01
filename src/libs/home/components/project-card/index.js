import styles from "./project-card.module.css"
import { FaGithub } from "react-icons/fa";

export const Card = ({ title, description, githubLink, deployLink }) => {
    return (
        <div className={styles.card}>
            {/* Title */}
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


            {/* Description */}
            <p className={styles.cardDescription}>{description}</p>

            {/* Tags */}
            {/* <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div> */}

            {/* Link Button */}
            {deployLink && (
                <a
                    href={deployLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardButton}
                >
                    View Project
                </a>
            )}
        </div>
    );
}
