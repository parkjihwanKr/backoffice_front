import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getCookie} from "../../../../../utils/CookieUtil";
import {useAuth} from "../../../../auth/components/AuthContext";
import Comments from "../../../shared/components/comments/Comments";
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import DepartmentBoardDetailsHeader from "./DepartmentBoardDetailsHeader";
import DepartmentBoardDetailsBody from "./DepartmentBoardDetailsBody";
import DepartmentBoardDetailsFooter from "./DepartmentBoardDetailsFooter";
import './DepartmentBoardDetails.css';

const DepartmentBoardDetails = () => {
    const { departmentName, boardId } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = getCookie('accessToken');
    const { userId, name } = useAuth();
    const [comments, setComments] = useState([]);
    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';
    const [files, setFiles] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const userReaction = board && board.reactionList
        ? board.reactionList.find(
            (reaction) => reaction.reactorId === userId // userId 기반으로 리액션 찾기
        )
        : null;

    const reactionId = userReaction ? userReaction.reactionId : null;

    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        category: '',
        isImportant: false,
        department: '',
        isLocked: false
    });

    // 파일 선택 시 파일 상태 업데이트
    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    useEffect(() => {
        console.log("userReaction : "+userReaction);
        const fetchBoard = async () => {
            try {
                const response = await fetch(`/api/v1/departments/${departmentName}/boards/${boardId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch board');
                }

                const data = await response.json();
                setBoard(data);
                console.log(data);
                setComments(data.commentList || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBoard();
    }, [boardId, accessToken]);

    // 게시글 수정 API 호출
    const handleEditSubmit = async () => {
        try {
            const formData = new FormData();

            const json = JSON.stringify({
                title: editForm.title,
                content: editForm.content,
                category: editForm.category,
                isImportant: editForm.isImportant,
                department: board.department,
                isLocked: board.isLocked,
            });
            formData.append('data', new Blob([json], { type: 'application/json' }));

            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }
            }

            const response = await fetch(`/api/v1/boards/${boardId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update board');
            }

            const updatedBoard = await response.json();
            setBoard(updatedBoard);
            setShowEditModal(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorCode = error.response.data.errorCode;
                const errorMessage = error.response.data.message; // 도메인별 에러 메시지
                alert(`${errorCode} : ${errorMessage}`);
            }else{
                console.error(error);
            }
        }
    };

    // 게시글 삭제 API 호출
    const handleDeleteSubmit = async () => {
        try {
            const response = await fetch(`/api/v1/boards/${boardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete board');
            }

            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card board-details">
                <DepartmentBoardDetailsHeader
                    title={board.title}
                    isImportant={board.isImportant}
                    imagePrefix={imagePrefix}
                    board={board}
                    name={name}
                    setShowEditModal={setShowEditModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
                <DepartmentBoardDetailsBody
                    board={board}
                    imagePrefix={imagePrefix}
                />

                <DepartmentBoardDetailsFooter
                    boardId={boardId}
                    reactionId={reactionId}
                    reactionList={board.reactionList}
                    name={name}
                    accessToken={accessToken}
                    likeCount={board.likeCount}
                    commentCount={board.commentCount}
                    viewCount={board.viewCount}
                />
            </div>

            <div className="divider" style={{ height : '15px'}}></div>

            <div className="card-footer comment-section">
                <Comments
                    comments={comments}
                    name={name}
                    boardId={boardId}
                    accessToken={accessToken}
                    setComments={setComments}
                />
            </div>
            {/* 모달 컴포넌트들 */}
            <EditModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                editForm={editForm}
                setEditForm={setEditForm}
                handleEditSubmit={handleEditSubmit}
                handleFileChange={handleFileChange}
            />

            <DeleteModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDeleteSubmit={handleDeleteSubmit}
            />
        </div>
    );
};

export default DepartmentBoardDetails;
