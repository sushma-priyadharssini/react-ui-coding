"use client";

import styles from "./layout.module.css"
import { useAppContext } from "@/libs/app-context";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
    const { app: { currentProject } } = useAppContext();
    const router = useRouter()

    return <div>
        <header className={styles.header}>
            <button
                className={styles.backButton}
                onClick={() => router.push("/")}>
                <FiArrowLeft size={20}/>
            </button>
            <div className={styles.projectTitle}>{currentProject}</div>
        </header>
        <div className={styles.pageLayout}>{children}</div>
    </div>
}

export default Layout;