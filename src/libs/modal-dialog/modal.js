"use client";
import { useState, useId, useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import Layout from "@/libs/layout"
import styles from "./modal.module.css"

function Backdrop({ children }) {
    return (
        <div className={styles.backdrop}>
            {children}
        </div>
    )
}

const ModalOverlay = ({ title, onClose, children }) => {
    const titleId = useId();
    const contentId = useId();
    const dialogRef = useRef(null);

    useEffect(() => {
        function onKeyDownFunction(ev) {
            if (ev.key === "Escape") {
                onClose()
            }
        }

        function onClickOutside(ev) {
            if (
                ev.target instanceof Node &&
                dialogRef.current != null &&
                !dialogRef.current?.contains(ev.target)
            ) {
                onClose()
            }
        }

        document.addEventListener("keydown", onKeyDownFunction)
        document.addEventListener('mousedown', onClickOutside);
        document.addEventListener('touchstart', onClickOutside);

        return () => {
            document.removeEventListener("keydown", onKeyDownFunction)
            document.removeEventListener('mousedown', onClickOutside);
            document.removeEventListener('touchstart', onClickOutside);
        }
    }, [])

    return (
        <Backdrop onClose={onClose}>
            <div
                className={styles.modal}
                role="dialog"
                ref={dialogRef}
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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Layout>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>

                {isOpen && <Dialog
                    isOpen={isOpen}
                    title={'Modal Dialog'}
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