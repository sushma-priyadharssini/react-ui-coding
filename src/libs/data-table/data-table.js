"use client";
import { useState } from 'react'
import { users } from './constants';
import styles from './table.module.css'


const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
];

function paginateUsers(
    usersList,
    page,
    pageSize,
) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const pageUsers = usersList.slice(start, end);
    const totalPages = Math.ceil(usersList.length / pageSize);
    return { pageUsers, totalPages };
}


export default function DataTable() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortKey, setSortKey] = useState({
        key: "id",
        order: 1
    })

    const sortedUsers = users.sort((a, b) => {
        const { key, order } = sortKey;
        if (a[key] < b[key]) {
            return -order;
        } else if (a[key] > b[key]) {
            return order;
        } else {
            return 0;
        }
    })

    const { totalPages, pageUsers } = paginateUsers(
        sortedUsers,
        page,
        pageSize,
    );

    const sortHandler = (key) => {
        setSortKey((p) => {
            return {
                key,
                order: p.key === key ? -(p.order) : 1
            }
        });
        setPage(1);
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map(({ label, key }) => (
                            <th className={styles.tableHeader} key={key} onClick={() => sortHandler(key)}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pageUsers.map(
                        ({ id, name, age, occupation }) => (
                            <tr key={id}>
                                <td className={styles.tableData}>{id}</td>
                                <td className={styles.tableData}>{name}</td>
                                <td className={styles.tableData}>{age}</td>
                                <td className={styles.tableData}>{occupation}</td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
            <hr />
            <div className={styles.pagination}>
                <select
                    aria-label="Page size"
                    onChange={(event) => {
                        setPageSize(Number(event.target.value));
                        setPage(1);
                    }}>
                    {[5, 10, 20].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
                <div className={styles.pages}>
                    <button
                        disabled={page === 1}
                        onClick={() => {
                            setPage(page - 1);
                        }}>
                        Prev
                    </button>
                    <span aria-label="Page number">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => {
                            setPage(page + 1);
                        }}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}