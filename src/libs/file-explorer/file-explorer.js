"use client";
import { useState, useEffect, useId } from 'react';
import { buildTreeUsingMap, data } from "./data"
import styles from "./file.module.css"
import { FileObject } from './file';

// function Folder({ data }) {
//   const [expand, setExpand] = useState(false);

//   return (
//     <div>
//       <div onClick={() => setExpand(!expand)}>
//         <div className={styles.itemContainer}>
//           {data.children.length > 0 && <div className={styles.iconContainer}>
//             <span
//               aria-hidden={true}
//               className={`${styles.accordionIcon} ${expand ? styles.accordionIconFlipped : ""}`}
//             />
//           </div>
//           }
//           <span> {data.name} </span>
//         </div>

//       </div>
//       {data.children && (
//         <div
//           style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
//         >
//           {data.children.map((i) => {
//             return <Folder key={i.name} data={i} />;
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


// export default function FolderStructure() {
//   const data = buildTreeUsingMap()
//   return (
//     <div>
//       {data.map((d) => {
//         return <Folder key={d.name} data={d} />;
//       })}
//     </div>
//   );
// }

export function FileList({
  fileList,
  level,
}) {
  const directories = fileList.filter(
    (fileItem) => fileItem.children.length > 0,
  );
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter(
    (fileItem) => fileItem.children?.length === 0,
  );
  nonDirectories.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const items = [...directories, ...nonDirectories];

  return (
    <ul className={styles.fileList}>
      {items.map((file, index) => (
        <FileObject
          key={file.id}
          file={file}
          level={level}
          posInSet={index + 1}
          setSize={items.length}
        />
      ))}
    </ul>
  );
}

export default function FileExplorer() {
  return (
    <div aria-label="Files Explorer" role="tree">
      <FileList fileList={data} level={1} />
    </div>
  );
}
