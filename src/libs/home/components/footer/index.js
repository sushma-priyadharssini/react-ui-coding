import { FiArrowRight, FiArrowLeft } from "react-icons/fi"; // Example: Arrow icon
import styles from "./footer.module.css";
import { ROUTES } from "../../routes";
import { useAppContext } from "../context/app-context";
import { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../constants";


const Footer = () => {
    const { pagination: { page }, dispatchers: {
        setPage
    } } = useAppContext();

    useEffect(() => {
        setPage({
            currPage: 1,
            endPage: Math.ceil(ROUTES.length / ITEMS_PER_PAGE)
        })
    }, [])


    const onPrevious = () => {
        setPage({
            currPage: page.currPage - 1,
            endPage: Math.ceil(ROUTES.length / ITEMS_PER_PAGE)
        })
        // setPage(p => ({ ...p, currPage: p.currPage - 1 }))
    }
    const onNext = () => {
        setPage({
            currPage: page.currPage + 1,
            endPage: Math.ceil(ROUTES.length / ITEMS_PER_PAGE)
        })
        // setPage(p => ({ ...p, currPage: p.currPage + 1 }))
    }
    const onPageButtonClick = (pageNum) => {
        setPage({
            currPage: pageNum,
            endPage: Math.ceil(ROUTES.length / ITEMS_PER_PAGE)
        })
        // setPage(p => ({ ...p, currPage: pageNum }))
    }

    const pages = Array.from({ length: page.endPage });

    return <footer className={styles.footer}>
        <div className={styles.pagination}>

            <button
                onClick={onPrevious}
                disabled={page.currPage === 1}>
                <FiArrowLeft />
            </button>

            {pages.map((_, index) => (
                <button key={index}
                    className={`${page.currPage === index + 1 ? styles.activePageButton : ""}`}
                    onClick={() => onPageButtonClick(index + 1)}>
                    {index + 1}
                </button>
            ))}

            <button
                onClick={onNext}
                disabled={page.currPage === page.endPage}>
                <FiArrowRight />
            </button>
        </div>
    </footer>;
}

export default Footer;