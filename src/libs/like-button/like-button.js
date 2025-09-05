"use client";
import { useState } from 'react';
import styles from "./like.module.css"
import { HeartIcon, SpinnerIcon } from "./icons"

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const likeHandler = async () => {
        setError(false)
        setIsLoading(true);
        try {
            const response = await fetch('https://questions.greatfrontend.com/api/questions/like-button', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: liked ? 'unlike' : 'like',
                }),
            });
            if (!response.ok) {
                const res = await response.json();
                setError(res.message);
                return;
            } else {
                setLiked(!liked);
            }
        } catch (error) {
            setError("error occured while making request");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div>
            <button className={`${styles.button} ${liked ? styles.liked : styles.default}`} onClick={likeHandler}>
                {isLoading ? <SpinnerIcon /> : <HeartIcon />}
                <span>{"Like"}</span>
            </button>
            {error && <div>{error}</div>}
        </div>
    );
}

export default LikeButton;