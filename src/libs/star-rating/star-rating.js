"use client";
import Layout from "@/libs/layout";
import { useState, useEffect, useCallback } from 'react';
import Star from "./star"

function StarRating({ starCount, rating, setRating }) {
    const [list, setList] = useState(new Array(starCount));
    const [hoverIndex, setHoveredIndex] = useState(null);

    const updateStars = useCallback((count) => {
        let res = [];
        for (let i = 0; i < starCount; i++) {
            res[i] = count > 0 ? true : false;
            count--;
        }
        setList(res);
    }, [starCount])

    useEffect(() => {
        updateStars(rating);
    }, [rating, updateStars])

    useEffect(() => {
        updateStars(hoverIndex ? hoverIndex : rating);
    }, [hoverIndex, updateStars])


    return (
        <div>
            {
                list.map((l, idx) => {
                    return (
                        <span
                            key={idx}
                            onClick={() => setRating(idx + 1)}
                            onMouseEnter={() => setHoveredIndex(idx + 1)}
                            onMouseLeave={() => setHoveredIndex(null)}>

                            <Star key={idx} isFilled={l} />
                        </span>
                    )
                })
            }
        </div>
    );
}

export default function StarRatingComponent() {
    const [rating, setRating] = useState(2);
    return (
        <Layout>
            <StarRating
                starCount={5}
                rating={rating}
                setRating={setRating} />
        </Layout>
    );
}