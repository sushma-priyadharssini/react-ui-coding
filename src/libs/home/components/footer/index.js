import { FiArrowRight, FiArrowLeft } from "react-icons/fi"; // Example: Arrow icon
import styles from "./footer.module.css";
import { ROUTES } from "../../routes";
import { useAppContext } from "@/libs/app-context";
import { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../constants";


const Footer = ({ projects }) => {
    const { pagination: { currentPage }, dispatchers: {
        setCurrentPage,
        goToNextPage,
        goToPrevPage
    } } = useAppContext();
    const endPage = Math.ceil(projects.length / ITEMS_PER_PAGE)
    const pages = Array.from({ length: endPage });

    return <footer className={styles.footer}>
        {!!projects.length && <div className={styles.pagination}>

            <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}>
                <FiArrowLeft />
            </button>

            {pages.map((_, index) => (
                <button key={index}
                    className={`${currentPage === index + 1 ? styles.activePageButton : ""}`}
                    onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                </button>
            ))}

            <button
                onClick={goToNextPage}
                disabled={currentPage === endPage}>
                <FiArrowRight />
            </button>
        </div>}
    </footer>;
}

export default Footer;