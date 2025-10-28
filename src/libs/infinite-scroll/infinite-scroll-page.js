"use client";
import { useEffect, useRef, useState } from "react";

/* For Visibility usecases */

// useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(ref.current); // Stop observing after visible
//         }
//       },
//       {
//         threshold: 0.2, // 20% of element visible triggers callback
//       }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, []);

export default function InfiniteScrollPage() {
    const [items, setItems] = useState(Array.from({ length: 5 }, (_, i) => i + 1));
    const [loading, setLoading] = useState(false);

    // Refs
    const loaderRef = useRef(null);

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
                rootMargin: "100px", // trigger 100px before reaching the bottom of element
            }
        );

        const current = loaderRef.current;
        if (current) observer.observe(current);

        return () => observer.disconnect();
    }, [loading]);

    return (
        <div
            style={{
                height: "400px",
                border: "2px solid #ccc",
                width: "50vw",
                overflowY: "auto",
                padding: "20px",
                position: "relative",
            }}
        >

            {items.map((item) => (
                <div
                    key={item}
                    style={{
                        margin: "16px 0",
                        padding: "20px",
                        background: "#f5f5f5",
                        borderRadius: "8px",
                    }}
                >
                    Item #{item}
                </div>
            ))}

            <div ref={loaderRef} style={{ height: "40px", textAlign: "center" }}>
                {loading && "Loading more... ⏳"}
            </div>
        </div>
    );
}