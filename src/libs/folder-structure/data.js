const items = [
    { id: 1, name: "item1", parentId: null },
    { id: 2, name: "item2", parentId: 1 },
    { id: 3, name: "item3", parentId: 1 },
    { id: 4, name: "item4", parentId: 2 },
];

export function buildTreeUsingMap() {
    const map = new Map();
    const roots = [];

    // Initialize all nodes with empty children
    items.forEach(item => {
        map.set(item.id, { ...item, children: [] });
    });

    // Link children to parents
    items.forEach(item => {
        if (item.parentId === null) {
            roots.push(map.get(item.id));
        } else {
            map.get(item.parentId).children.push(map.get(item.id));
        }
    });

    console.log(roots)

    return roots;
}

export function buildTreeRecursive(parentId = null) {
    return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
            ...item,
            children: buildTreeRecursive(item.id)
        }));
}