"use client";
import { useState } from "react";
import "./styles.css";
import Comment from "./comment"
import useCommentTree from "../hooks/use-comment-tree";

const NestedComment = ({ comments, onSubmit, onEdit, onDelete, onUpvote, onDownvote }) => {
    const [comment, setComment] = useState("");

    const {
        comments: commentsData,
        insertComment,
        editComment,
        deleteComment,
        // sortComments,
        toggleVote,
    } = useCommentTree(comments);

    const handleVote = (commentId, hasVoted) => {
        toggleVote(commentId, hasVoted)
    }

    const handleReply = (commentId, content) => {
        insertComment(commentId, content);
        onSubmit(content);
    };

    const handleEdit = (commentId, content) => {
        editComment(commentId, content);
        onEdit(content);
    };

    const handleDelete = (commentId) => {
        deleteComment(commentId);
        onDelete(commentId);
    };

    const handleEditChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        if (comment) {
            handleReply(undefined, comment);
            setComment("");
        }
    };
    return <div>
        <div className="add-comment">
            <textarea
                value={comment}
                onChange={handleEditChange}
                rows={3}
                cols={50}
                className="comment-textarea"
                placeholder="Add a new comment..."
            />
            <button onClick={handleSubmit} className="comment-button">
                Add Comment
            </button>
        </div>
        <div className="comment-container">
            {commentsData.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onSubmitComment={handleReply}
                    onEditComment={handleEdit}
                    onDeleteComment={handleDelete}
                    onVote={handleVote}
                />
            ))}
        </div>
    </div>
}


export default NestedComment;