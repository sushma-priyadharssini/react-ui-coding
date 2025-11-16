"use client";
import { useEffect, useRef } from "react";

const BOX_WIDTH = 50

export default function Animation() {
    const boxRef = useRef(null);
    const pos = useRef(0);

    useEffect(() => {
        let frameId;

        const animate = () => {
            pos.current += 2;
            // boxRef.current.style.transform = `translateX(${pos.current}px)`;
            if (pos.current > window.innerWidth) {
                pos.current = -BOX_WIDTH;
            }
            if (boxRef.current) {
                boxRef.current.style.left = pos.current + 'px';
            }
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, []);

    return <div ref={boxRef} style={{
        width: BOX_WIDTH,
        height: BOX_WIDTH,
        background: 'coral',
        position: 'absolute',
        left: 0
    }} />;
}