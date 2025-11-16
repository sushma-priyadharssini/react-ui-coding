"use client";
import { useEffect, useRef, useState } from "react";

export default function VirtualizedList() {
    const [items, setItems] = useState(Array.from({ length: 5 }, (_, i) => i + 1));
    const [loading, setLoading] = useState(false);

    // Refs
    const containerRef = useRef(null);
    const loaderRef = useRef(null);

    const [scrollTop, setScrollTop] = useState(0);

    // virtualization parameters
    const itemHeight = 80;
    const containerHeight = 400;
    const buffer = 0; // extra items above & below viewport

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const endIndex = Math.min(
        items.length - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight) + buffer
    );
    const visibleItems = items.slice(startIndex, endIndex + 1);

    // Function to load more data
    const loadMore = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setItems((prev) => [
                ...prev,
                ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1),
            ]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading) {
                    loadMore();
                }
            },
            {
                root: containerRef.current,
                rootMargin: "100px", // trigger 100px before reaching the bottom of element
            }
        );

        const current = loaderRef.current;
        if (current) observer.observe(current);

        return () => observer.disconnect();
    }, [loading]);

    // Handle scroll - onScroll updates scrollTop - Keeps track of scroll position.
    const handleScroll = (e) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{
                height: `${containerHeight}px`,
                border: "2px solid #ccc",
                width: "70vw",
                overflowY: "auto",
                padding: "20px",
                position: "relative",
            }}
        >

            {/* A full item container to position the scroll in place  */}
            <div style={{ height: items.length * itemHeight, position: "relative" }}>
                {visibleItems.map((item, i) => {
                    const index = startIndex + i;
                    const top = index * itemHeight;
                    return (
                        <div
                            key={item}
                            style={{
                                position: "absolute", // Each visible item is placed in its actual scroll position.
                                top,
                                left: 0,
                                right: 0,
                                height: itemHeight - 10,
                                margin: "5px 10px",
                                background: "#f4f4f4",
                                borderRadius: "8px",
                                padding: "20px",
                                boxSizing: "border-box",
                            }}
                        >
                            Item #{item}
                        </div>
                    );
                })}
            </div>

            <div ref={loaderRef} style={{ height: "40px", textAlign: "center" }}>
                {loading && "Loading more... ⏳"}
            </div>
        </div>
    );
}