"use client";
import { useState, useId, useEffect } from 'react';
import { createPortal } from "react-dom";
import Layout from "@/libs/layout"
import styles from "./modal.module.css"

function Backdrop({ children, onClose }) {
    return (
        <div className={styles.backdrop} onClick={onClose}>
            {children}
        </div>
    )
}

const ModalOverlay = ({ title, onClose, children }) => {
    const titleId = useId();
    const contentId = useId();

    useEffect(() => {
        function onKeyDownFunction(ev) {
            if (ev.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", onKeyDownFunction)
        return () => document.removeEventListener("keydown", onKeyDownFunction)
    }, [])

    return (
        <Backdrop onClose={onClose}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={contentId}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle} id={titleId}>{title}</h3>
                    <button className={styles.modalClose} onClick={onClose}>X</button>
                </div>
                <div id={contentId} className={styles.modalContent}>{children}</div>
            </div>
        </Backdrop>
    )
}

const Dialog = (props) => {
    return (
        <>
            {createPortal(
                <ModalOverlay
                    title={props.title}
                    onClose={props.onClose}>
                    {props.children}
                </ModalOverlay>,
                document.getElementById('overlays'))
            }
        </>
    );
}

const ModalDialog = () => {
    const [title, setTitle] = useState('Modal Dialog');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Layout>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>

                {isOpen && <Dialog
                    isOpen={isOpen}
                    title={title}
                    onClose={() => setIsOpen(false)} >
                    One morning, when Gregor Samsa woke from troubled
                    dreams, he found himself transformed in his bed into
                    a horrible vermin. He lay on his armour-like back,
                    and if he lifted his head a little he could see his
                    brown belly, slightly domed and divided by arches
                    into stiff sections.
                </Dialog>
                }

            </Layout>
            <div id="overlays"></div>
            {/* can be anywhere in the page */}
        </>
    );
}

export default ModalDialog