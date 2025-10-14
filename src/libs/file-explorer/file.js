import { useId, useState } from "react";
import { FileList } from "./file-explorer";
import styles from "./file.module.css"

export function FileObject({
    file,
    level,
    posInSet,
    setSize
}) {
    const id = useId();
    const [expanded, setExpanded] = useState(false);
    const { children: fileChildren, name: fileName } = file;
    // If the children field is present, the item is a directory.
    const isDirectory = fileChildren.length > 0;

    return (
        <li
            aria-expanded={isDirectory ? expanded : undefined}
            aria-labelledby={id}
            aria-level={level}
            aria-posinset={posInSet}
            aria-setsize={setSize}
            className={styles.fileItem}
            role="treeitem"
        >
            <button
                className={`${styles.fileItemButton} ${isDirectory ? styles.fileItemButtonDirectory : ""}`}
                onClick={() => {
                    if (!isDirectory) {
                        return;
                    }

                    setExpanded(!expanded);
                }}>
                <span>{fileName}</span>{' '}
                {isDirectory && <>[{expanded ? '-' : '+'}]</>}
            </button>
            {fileChildren &&
                fileChildren.length > 0 &&
                expanded && (
                    <FileList
                        fileList={fileChildren}
                        level={level + 1}
                    />
                )}
        </li>
    );
}