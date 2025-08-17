"use client";
import { useState, useId } from 'react';
import styles from "./accordion.module.css"
import { getAccordionControlId, getAccordionRegionId } from "./utils"

const AccordionItem = ({ sections }) => {
    const [activeSections, setActiveSections] = useState(new Set());
    const accordionId = useId();

    const focusOnSection = (index) => {
        document
            .getElementById(
                getAccordionControlId(
                    accordionId,
                    sections[index].value,
                ),
            )
            .focus();
    }

    const keyDownHandler = (ev) => {
        let key = ev.key;
        const activeItemValue =
            document.activeElement.getAttribute(
                'data-accordion-value',
            );
        if (activeItemValue == null) {
            return;
        }

        switch (key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                {
                    const index = sections.findIndex(
                        ({ value: itemValue }) =>
                            itemValue === activeItemValue,
                    );
                    focusOnSection(
                        (index - 1 + sections.length) %
                        sections.length,
                    );
                    break;
                }

            case 'ArrowDown':
            case 'ArrowRight':
                {
                    const index = sections.findIndex(
                        ({ value: itemValue }) =>
                            itemValue === activeItemValue,
                    );
                    focusOnSection((index + 1) % sections.length);
                    break;
                }

            case 'Home': {
                focusOnSection(0);
                break;
            }
            case 'End': {
                focusOnSection(sections.length - 1);
                break;
            }
            default:
                break;
        }
    }


    return (
        <div className={styles.accordion} onKeyDown={keyDownHandler}>
            {
                sections.map((section) => {
                    const { value, title, contents } = section;
                    const isExpanded = activeSections.has(value);
                    const controlId = getAccordionControlId(accordionId, value)
                    const regionId = getAccordionRegionId(accordionId, value)

                    return <div className={styles.accordionItem} key={value}>
                        <button
                            className={styles.accordionItemTitle}
                            aria-expanded={!!isExpanded}
                            type="button"
                            id={controlId}
                            aria-controls={regionId}
                            data-accordion-value={value}
                            onClick={() => {
                                setActiveSections((prev) => {
                                    const newActiveSections = new Set(prev);
                                    if (newActiveSections.has(value)) {
                                        newActiveSections.delete(value)
                                    } else {
                                        newActiveSections.add(value)
                                    }
                                    return newActiveSections;
                                })
                            }}>
                            <div>{title}</div>
                            <span
                                aria-hidden={true}
                                className={`${styles.accordionIcon} ${isExpanded ? styles.accordionIconFlipped : ""}`}
                            />
                        </button>
                        {isExpanded && <div
                            className={styles.accordionItemContents}
                            role="region"
                            aria-labelledby={controlId}
                            id={regionId}
                            hidden={!isExpanded}>{contents}</div>}
                    </div>
                })
            }
        </div>
    )
}

export default AccordionItem;