"use client";
import { useEffect, useRef } from "react";

export default function Animation() {
    const boxRef = useRef(null);
    const pos = useRef(0);

    useEffect(() => {
        let frameId;

        const animate = () => {
            pos.current += 2;
            // boxRef.current.style.transform = `translateX(${pos.current}px)`;
            if (boxRef.current) {
                boxRef.current.style.left = pos.current + 'px';
            }
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, []);

    return <div ref={boxRef} style={{
        width: 50, height: 50, background: 'coral', position: 'absolute'
    }} />;
}