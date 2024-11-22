/*
import React, {useEffect, useState} from 'react';
import {getCookie} from "../../../../utils/CookieUtil";
import {Link, useNavigate, useParams} from 'react-router-dom'; // useParams 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 적용
import './DepartmentBoard.css'; // CSS 파일 import
import {imagePrefix} from '../../../../utils/Constant';
import PaginationFooter from "../../../../components/common/PaginationFooter";
import {departmentReverseMapping} from "../../shared/services/BoardsService";
import {getDefaultImage} from "../../../../utils/ImageUtils";
import {fetchDepartmentBoard} from "../services/DepartmentBoardsService";

const DepartmentBoards = () => {
    const [departmentBoards, setDepartmentBoards] = useState([]); // 게시글 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 8; // 한 페이지에 보여줄 게시글 수
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const { department } = useParams(); // URL에서 department 받아오기
    const mappedDepartment = department => departmentReverseMapping[department] || department;

    const indexOfLastBoard = currentPage * itemsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
    const currentBoards = departmentBoards.slice(indexOfFirstBoard, indexOfLastBoard);
    const totalPages = Math.ceil(departmentBoards.length / itemsPerPage);

    // 부서 게시판 데이터를 서버에서 가져오는 함수
    const fetchBoards = async () => {
        try {
            const response = await fetchDepartmentBoard(department);
            setDepartmentBoards(response.content); // 게시글 목록 설정
            setLoading(false); // 로딩 완료
        } catch (error) {
            setError(error.message); // 에러 상태 업데이트
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        fetchBoards(); // 컴포넌트가 렌더링될 때 데이터 가져오기
    }, [department]); // department가 변경될 때마다 API 호출 (수정됨)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCardClick = (boardId) => {
        if (boardId) {
            navigate(`/departments/${department}/boards/${boardId}`); // 부서와 게시글 ID를 포함한 경로로 이동
        } else {
            console.error('boardId is undefined'); // boardId가 없으면 오류 출력
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="department-boards-container">
            <div className="board-container-header">
                <div className="board-container-header-title">
                    <h2>{mappedDepartment(department)} 공지 사항</h2>
                </div>
                <div className="board-container-header-end">
                    <Link to={`/create-department-board/${department}`} className="no-underline-link">
                        <button className="button">새 게시글 작성</button>
                    </Link>
                </div>
            </div>

            <div className="row">
                {currentBoards.map((board, index) => (
                    <div
                        className="col-md-12 mb-3"
                        key={board.boardId || index}
                        onClick={() => handleCardClick(board.boardId)} // 클릭 시 상세 페이지로 이동
                        style={{cursor: 'pointer'}}
                    >
                        <div className="card">
                        <div className="row no-gutters d-flex">
                                <div style={{position: 'absolute', top: '10px', left: '33px', zIndex: '1'}}>
                                    <img
                                        src={board.isLocked ? `${imagePrefix}/shared/lock.png` : `${imagePrefix}/shared/unlock.png`}
                                        alt={board.isLocked ? "Locked" : "Unlocked"}
                                        width="30"
                                    />
                                </div>
                                <div style={{position: 'absolute', top: '10px', left: '0px', zIndex: '1'}}>
                                    <img
                                        src={board.isImportant ? `${imagePrefix}/shared/isImportant_true.png` : `${imagePrefix}/shared/isImportant_false.png`}
                                        alt={board.isImportant ? "Important" : "Not Important"}
                                        width="30"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <img
                                        src={getDefaultImage(index)}
                                        alt="Board Image"
                                        className="card-img-left"
                                    />
                                </div>
                                <div className="col-md-6 d-flex flex-column justify-content-center text-center">
                                    <div className="card-body">
                                        <h3 className="card-title">{board.title}</h3>
                                        <p className="card-text">{board.content}</p>
                                    </div>

                                    <div className="hover-info d-flex justify-content-between">
                                        <span>
                                            <img src={`${imagePrefix}/shared/likes.png`} alt="likes"
                                                 style={{width: '20px', height: '20px'}}/> {board.likeCount}
                                        </span>
                                        <span>
                                            <img src={`${imagePrefix}/shared/viewCount.png`} alt="views"
                                                 style={{width: '20px', height: '20px'}}/> {board.viewCount}
                                        </span>
                                        <span>
                                            <img src={`${imagePrefix}/shared/commentList.png`} alt="comments"
                                                 style={{width: '25px', height: '20px'}}/> {board.commentCount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default DepartmentBoards;
*/

import React from "react";
import BoardList from "../../shared/components/BoardList";

const DepartmentBoards = () => {
    return <BoardList isDepartmentBoard />;
};

export default DepartmentBoards;
