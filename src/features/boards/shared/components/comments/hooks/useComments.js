import {useEffect, useRef, useState} from 'react';
import {useAuth} from "../../../../../auth/context/AuthContext";
import {
    createBoardComment,
    createCommentReaction,
    createCommentReply,
    deleteComment,
    deleteCommentReaction,
    updateComment
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

    const requestInProgress = useRef(false);

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

    // 댓글 생성 로직
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const newComment = await createBoardComment(boardId, { content: comment });
        setComments((prev) => [...prev, newComment]);
        setComment('');
    };

    // 대댓글 작성 로직
    const handleReplySubmit = async (replyContent) => {
        const response = await createCommentReply(boardId, commentToReply.commentId, { content: replyContent });
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === commentToReply.commentId
                    ? { ...comment, replyList: [...(comment.replyList || []), response] }
                    : comment
            )
        );
        setShowReplyModal(false);
    };

    // 댓글 좋아요 로직
    const handleCommentLike = async (commentId) => {
        const commentLiked = likedComments[commentId]?.liked;
        const reactionId = likedComments[commentId]?.reactionId;

        if (requestInProgress.current) return;
        requestInProgress.current = true;

        // 낙관적 UI
        // 사용 이유 : 게시글의 댓글의 '좋아요'를 가지고 오는 것이라,
        // 게시글 댓글 좋아요 같은 경우는 도메인을 세 번 거쳐야한 다는 점에 의해
        // 조회하는데, 많은 시간이 소요될거라는 점과 '좋아요' 정보는 중요하지 않다는 점에 의해
        // 낙관적 UI를 적용해서 '해당 UI가 그렇게 될 것이다.'라는 가정을 통한 UI 생성
        setLikedComments((prev) => ({
            ...prev,
            [commentId]: { liked: !commentLiked, reactionId: commentLiked ? null : reactionId },
        }));
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === commentId
                    ? {
                        ...comment,
                        likeCount: commentLiked
                            ? comment.likeCount - 1
                            : comment.likeCount + 1,
                    }
                    : comment
            )
        );

        try {
            if (commentLiked) {
                await deleteCommentReaction(boardId, commentId, reactionId);
                setLikedComments((prev) => ({
                    ...prev,
                    [commentId]: { liked: false, reactionId: null },
                }));

            } else {
                const reaction = await createCommentReaction(boardId, commentId, { emoji: 'LIKE' });

                setLikedComments((prev) => ({
                    ...prev,
                    [commentId]: { liked: true, reactionId: reaction.reactionId },
                }));
            }
        } catch (error) {
            setLikedComments((prev) => ({
                ...prev,
                [commentId]: { liked: commentLiked, reactionId },
            }));
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? {
                            ...comment,
                            likeCount: commentLiked
                                ? comment.likeCount + 1
                                : comment.likeCount - 1,
                        }
                        : comment
                )
            );
            console.log(error.response.data);
            alert(error.response.data.data + " : " + error.response.data.message);
        } finally {
            requestInProgress.current = false;
        }
    };

    // 댓글 수정 로직
    const handleEditSubmit = async (newContent) => {
        const updatedComment = await updateComment(boardId, commentIdToEdit, { content: newContent });
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.commentId === updatedComment.commentId
                    ? { ...comment, content: updatedComment.content, modifiedAt: updatedComment.modifiedAt }
                    : comment
            )
        );
        setShowEditModal(false);
    };

    // 댓글 삭제 로직
    const handleDeleteSubmit = async () => {
        await deleteComment(boardId, commentIdToDelete);
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.commentId !== commentIdToDelete)
        );
        setShowDeleteModal(false);
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

    // 댓글 수정 핸들러
    const handleEditComment = (commentId, commentContent) => {
        setCommentIdToEdit(commentId);
        setEditingCommentContent(commentContent);
        setShowEditModal(true);
    };

    // 댓글 삭제 핸들러
    const handleDeleteComment = (commentId) => {
        setCommentIdToDelete(commentId);
        setShowDeleteModal(true);
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
        showDeleteModal,
        setShowDeleteModal,
        showReplyModal,
        setShowReplyModal,
        commentToReply,
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
