import { useEffect, useState } from 'react';
import {useAuth} from "../../../../../auth/context/AuthContext";
import {
    createBoardComment,
    createBoardReply, createCommentReaction,
    deleteComment,
    deleteCommentReaction,
    editComment
} from "../service/CommentsService";

export const useComments = (boardId, comments, setComments) => {
    const {id} = useAuth();
    const [comment, setComment] = useState('');
    const [likedComments, setLikedComments] = useState({});
    const [hoveredCommentId, setHoveredCommentId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [commentIdToEdit, setCommentIdToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState(null);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [commentToReply, setCommentToReply] = useState(null);
    const [showReplies, setShowReplies] = useState({});

    useEffect(() => {
        const initialLikedComments = {};
        comments.forEach((comment) => {
            const userReaction = comment.reactionList?.find(
                (reaction) => reaction.reactorId === id
            );
            initialLikedComments[comment.commentId] = userReaction
                ? { liked: true, reactionId: userReaction.reactionId }
                : { liked: false, reactionId: null };
        });
        setLikedComments(initialLikedComments);
    }, [comments]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const newComment = await createBoardComment(boardId, { content: comment });
        setComments((prev) => [...prev, newComment]);
        setComment('');
    };

    const toggleShowReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleReply = (comment) => {
        setCommentToReply(comment);
        setShowReplyModal(true);
    };

    const handleReplySubmit = async (replyContent) => {
        const response = await createBoardReply(boardId, commentToReply.commentId, { content: replyContent });
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === commentToReply.commentId
                    ? { ...comment, replyList: [...(comment.replyList || []), response] }
                    : comment
            )
        );
        setShowReplyModal(false);
    };

    const handleCommentLike = async (commentId) => {
        const commentLiked = likedComments[commentId]?.liked;
        const reactionId = likedComments[commentId]?.reactionId;
        if (commentLiked) {
            await deleteCommentReaction(boardId, commentId, reactionId);
        } else {
            const reaction = await createCommentReaction(boardId, commentId, { emoji: 'LIKE' });
            setLikedComments((prev) => ({
                ...prev,
                [commentId]: { liked: true, reactionId: reaction.reactionId },
            }));
        }
    };

    const handleEditComment = (commentId, commentContent) => {
        setCommentIdToEdit(commentId);
        setEditingCommentContent(commentContent);
        setShowEditModal(true);
    };

    const handleDeleteComment = (commentId) => {
        setCommentIdToDelete(commentId);
        setShowDeleteModal(true);
    };

    const handleEditSubmit = async (newContent) => {
        const updatedComment = await editComment(boardId, commentIdToEdit, { content: newContent });
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === updatedComment.commentId
                    ? { ...comment, content: updatedComment.content, modifiedAt: updatedComment.modifiedAt }
                    : comment
            )
        );
        setShowEditModal(false);
    };

    const handleDeleteSubmit = async () => {
        await deleteComment(boardId, commentIdToDelete);
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.commentId !== commentIdToDelete)
        );
        setShowDeleteModal(false);
    };

    return {
        comment,
        setComment,
        likedComments,
        hoveredCommentId,
        setHoveredCommentId,
        showEditModal,
        setShowEditModal,
        editingCommentContent,
        commentIdToEdit,
        showDeleteModal,
        setShowDeleteModal,
        commentIdToDelete,
        showReplyModal,
        setShowReplyModal,
        commentToReply,
        setCommentToReply,
        showReplies,
        handleCommentSubmit,
        handleReply,
        handleReplySubmit,
        handleCommentLike,
        toggleShowReplies,
        handleEditComment,
        handleDeleteComment,
        handleEditSubmit,
        handleDeleteSubmit,
    };
};
