"use client";

import styles from "./layout.module.css"
import { useAppContext } from "@/libs/app-context";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/libs/home"

const Layout = ({ children }) => {
    const { app: { currentProject } } = useAppContext();
    const router = useRouter();
    const pathName = usePathname()
    const pageTitle = currentProject || ROUTES.find(r => r.path.includes(pathName)).name;

    return <div>
        <header className={styles.header}>
            <button
                className={styles.backButton}
                onClick={() => router.push("/")}>
                <FiArrowLeft size={20} />
            </button>
            <div className={styles.projectTitle}>{pageTitle}</div>
        </header>
        <div className={styles.pageLayout}>{children}</div>
    </div>
}

export default Layout;