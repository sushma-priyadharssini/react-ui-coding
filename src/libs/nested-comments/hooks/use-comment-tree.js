import { useState } from "react";

const useCommentTree = (initialComments) => {
    const [comments, setComments] = useState(initialComments);

    const insertNode = (tree, nodeId, newComment) => {
        return tree.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    replies: [newComment, ...node.replies],
                };
            } else if (node.replies && node.replies.length > 0) {
                return {
                    ...node,
                    replies: insertNode(node.replies, nodeId, newComment),
                };
            }
            return node;
        });
    };


    const insertComment = (commentId, content) => {
        const newComment = {
            id: Date.now(),
            content,
            votes: 0,
            timestamp: new Date().toISOString(),
            replies: [],
        };
        if (commentId) {
            setComments((prevComments) =>
                insertNode(prevComments, commentId, newComment)
            );
        } else {
            setComments((prevComments) => [newComment, ...prevComments]);
        }
    }

    const editNode = (tree, nodeId, content) => {
        return tree.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    content: content,
                    timestamp: new Date().toISOString(),
                };
            } else if (node.replies && node.replies.length > 0) {
                return {
                    ...node,
                    replies: editNode(node.replies, nodeId, content),
                };
            }
            return node;
        });
    };

    const editComment = (commentId, content) => {
        setComments((prevComments) => editNode(prevComments, commentId, content));
    }

    const deleteNode = (tree, nodeId) => {
        return tree.reduce((acc, node) => {
            if (node.id === nodeId) {
                return acc;
            } else if (node.replies && node.replies.length > 0) {
                node.replies = deleteNode(node.replies, nodeId);
            }
            return [...acc, node]; // check why
        }, []);
    }

    const deleteComment = (commentId) => {
        setComments((prevComments) => deleteNode(prevComments, commentId));
    }

    const updateNodeVote = (tree, nodeId, hasVoted) => {
        return tree.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    votes: hasVoted ? node.votes + 1 : node.votes - 1
                }
            } else if (node.replies && node.replies.length > 0) {
                return {
                    ...node,
                    replies: updateNodeVote(node.replies, nodeId, hasVoted),
                };
            }
            return node;
        })
    }

    const toggleVote = (commentId, hasVoted) => {
        setComments((prevComments) => updateNodeVote(prevComments, commentId, hasVoted))
    }

    return {
        comments,
        insertComment,
        editComment,
        deleteComment,
        toggleVote
    }

}

export default useCommentTree;