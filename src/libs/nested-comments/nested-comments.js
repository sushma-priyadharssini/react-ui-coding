"use client";
import { COMMENTS } from "./data/comment.js";
import NestedComment from "./components/nested-comment"

const NestedComments = () => {
    return <NestedComment
        comments={COMMENTS}
        onSubmit={() => { }}
        onEdit={() => { }}
        onDelete={() => { }}
        onUpvote={() => { }}
        onDownvote={() => { }} />
}


export default NestedComments;