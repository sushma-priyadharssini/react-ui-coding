const rawData = [
    { id: 1, name: "README.md", parentId: null },
    { id: 2, name: "Documents", parentId: null },
    { id: 3, name: "Word.doc", parentId: 2 },
    { id: 4, name: "Powerpoint.ppt", parentId: 2 },
    { id: 5, name: "Downloads", parentId: null },
    { id: 6, name: "unnamed.txt", parentId: 5 },
    { id: 7, name: "Misc", parentId: 5 },
    { id: 8, name: "foo.txt", parentId: 7 },
    { id: 9, name: "bar.txt", parentId: 7 },
];

export function buildTreeUsingMap() {
    const map = new Map();
    const roots = [];

    // Initialize all nodes with empty children
    rawData.forEach(item => {
        map.set(item.id, { ...item, children: [] });
    });

    // Link children to parents
    rawData.forEach(item => {
        if (item.parentId === null) {
            roots.push(map.get(item.id));
        } else {
            map.get(item.parentId).children.push(map.get(item.id));
        }
    });

    return roots;
}

export function buildTreeRecursive(parentId = null) {
    return rawData
        .filter(item => item.parentId === parentId)
        .map(item => ({
            ...item,
            children: buildTreeRecursive(item.id)
        }));
}

export const data = buildTreeRecursive();

// Transformed data will look like this
/* [
    {
        id: 1,
        name: 'README.md',
    },
    {
        id: 2,
        name: 'Documents',
        children: [
            {
                id: 3,
                name: 'Word.doc',
            },
            {
                id: 4,
                name: 'Powerpoint.ppt',
            },
        ],
    },
    {
        id: 5,
        name: 'Downloads',
        children: [
            {
                id: 6,
                name: 'unnamed.txt',
            },
            {
                id: 7,
                name: 'Misc',
                children: [
                    {
                        id: 8,
                        name: 'foo.txt',
                    },
                    {
                        id: 9,
                        name: 'bar.txt',
                    },
                ],
            },
        ],
    },
]; */