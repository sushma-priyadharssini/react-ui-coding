"use client";

import { useState } from "react";

const Comment = ({
    comment,
    onSubmitComment,
    onEditComment,
    onDeleteComment,
    onVote,
}) => {
    const [expand, setExpand] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [editedContent, setEditedContent] = useState(comment.content);
    const [hasVoted, setHasVoted] = useState(false)

    const toggleExpand = () => {
        setExpand(!expand);
    };

    const toggleReplyMode = () => {
        setReplyMode(!replyMode)
    }

    const handleReplySubmit = () => {
        if (replyContent) {
            onSubmitComment(comment.id, replyContent);
            setReplyContent("");
            toggleReplyMode()
        }
    }

    const handleChange = (e) => {
        if (editMode) {
            setEditedContent(e.target.value);
        } else {
            setReplyContent(e.target.value);
        }
    }

    const handleEditSubmit = () => {
        onEditComment(comment.id, editedContent);
        setEditMode(false);
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setEditedContent(comment.content); // Reset edited content to current comment content
    }

    const handleVote = () => {
        onVote(comment.id, !hasVoted)
        setHasVoted(!hasVoted)
    }

    return <div className="comment">
        {!editMode ? (
            <>
                <p className="comment-content">{comment.content}</p>
                <p className="comment-info">Votes: {comment.votes}</p>
                <p className="comment-info" suppressHydrationWarning>
                    {new Date(comment.timestamp).toLocaleString("en-US", { timeZone: "UTC" })}
                </p>
            </>
        ) : (
            <div className="add-comment">
                <textarea
                    value={editedContent}
                    onChange={handleChange}
                    rows={3}
                    cols={50}
                    className="comment-textarea"
                />
                <button onClick={handleEditSubmit} className="comment-button">
                    Save Edit
                </button>
                <button onClick={toggleEditMode} className="comment-button">
                    Cancel Edit
                </button>
            </div>
        )}

        <div className="comment-actions">
            <button onClick={handleVote} className="comment-button">
                {hasVoted ? "❤️" : "🤍"}
            </button>
            <button onClick={toggleReplyMode} className="comment-button">
                Reply
            </button>
            <button onClick={toggleEditMode} className="comment-button">
                Edit
            </button>
            <button
                onClick={() => onDeleteComment(comment.id)}
                className="comment-button"
            >
                Delete
            </button>
        </div>

        {replyMode && <div className="add-comment">
            <textarea
                value={replyContent}
                onChange={handleChange}
                placeholder="Add a reply..."
                rows={3}
                cols={50}
                className="comment-textarea"
            />
            <button onClick={handleReplySubmit} className="comment-button">
                Submit Reply
            </button>
            <button onClick={toggleReplyMode} className="comment-button">
                Cancel Reply
            </button>
        </div>}

        {comment?.replies?.length > 0 && !expand &&
            <button onClick={toggleExpand} className="toggle-reply-button">
                {`------------ View ${comment.replies.length} more replies`}
            </button>
        }

        {expand && (
            <div className="comment-replies">
                {comment?.replies?.map((reply) => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        onSubmitComment={onSubmitComment}
                        onEditComment={onEditComment}
                        onDeleteComment={onDeleteComment}
                        onVote={onVote}
                    />
                ))}
                {comment?.replies?.length > 0 &&
                    <button onClick={toggleExpand} className="toggle-reply-button">
                        {`------------ Hide replies`}
                    </button>
                }
            </div>
        )}
    </div>
}


export default Comment;