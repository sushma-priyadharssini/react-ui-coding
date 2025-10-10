"use client";
import { useState, useEffect } from 'react';
import { buildTreeUsingMap } from "./data"
import styles from "./folder.module.css"

function Folder({ data }) {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div onClick={() => setExpand(!expand)}>
        <div className={styles.itemContainer}>
          {data.children.length > 0 && <div className={styles.iconContainer}>
            <span
              aria-hidden={true}
              className={`${styles.accordionIcon} ${expand ? styles.accordionIconFlipped : ""}`}
            />
          </div>
          }
          <span> {data.name} </span>
        </div>

      </div>
      {data.children && (
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
        >
          {data.children.map((i) => {
            return <Folder key={i.name} data={i} />;
          })}
        </div>
      )}
    </div>
  );
}


export default function FolderStructure() {
  const data = buildTreeUsingMap()
  return (
    <div>
      {data.map((d) => {
        return <Folder key={d.name} data={d} />;
      })}
    </div>
  );
}