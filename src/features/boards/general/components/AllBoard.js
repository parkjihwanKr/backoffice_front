import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../../utils/CookieUtil";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 적용

const AllBoards = () => {
    const [boards, setBoards] = useState([]); // 게시글 목록을 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 관리
    const itemsPerPage = 8; // 한 페이지에 보여줄 게시글 수
    const accessToken = getCookie('accessToken');
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

    // S3 서버의 이미지 prefix
    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';

    // 카테고리에 따라 기본 이미지를 할당하는 함수
    const getDefaultImage = (category) => {
        if (category === "전체 알림") {
            return `${imagePrefix}/board/brainstorming.png`;
        } else if (category === "회의실") {
            return `${imagePrefix}/board/workshop.png`;
        } else if (category === "협업") {
            return `${imagePrefix}/board/communication.png`;
        } else {
            // 카테고리가 지정되지 않았을 경우 기본 이미지 설정
            return `${imagePrefix}/board/communication.png`;
        }
    };

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('/api/v1/boards', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch boards');
                }

                const data = await response.json();
                setBoards(data.content); // Page 객체의 content 부분에 게시글 목록이 있음
                setLoading(false); // 로딩 완료
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBoards();
    }, [accessToken]);

    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때
    }

    if (error) {
        return <p>Error: {error}</p>; // 에러 발생 시
    }

    // 현재 페이지에 맞는 게시글들 계산
    const indexOfLastBoard = currentPage * itemsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
    const currentBoards = boards.slice(indexOfFirstBoard, indexOfLastBoard);

    // 페이지 번호 계산
    const totalPages = Math.ceil(boards.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 게시글 상세 페이지로 이동하는 함수
    const goToBoardDetail = (boardId) => {
        if (boardId) {
            navigate(`/all-boards/${boardId}`);
        } else {
            console.error("boardId is undefined");
        }
    };

    return (
        <div className="container mt-5">
            {/* 공지 사항 타이틀 중앙 정렬 */}
            <div className="d-flex justify-content-center mb-3">
                <h2>공지 사항</h2>
            </div>

            {/* 새 게시글 작성 버튼 - 오른쪽 정렬 */}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/create-board">
                    <button className="btn btn-primary">새 게시글 작성</button>
                </Link>
            </div>

            {/* 게시판 카드 */}
            <div className="row">
                {currentBoards.map((board, index) => (
                    <div
                        className="col-md-12 mb-3"
                        key={board.id || index}
                        style={{
                            margin: '0 auto',
                            cursor: 'pointer', // 클릭 가능한 느낌을 주기 위해 커서 스타일 추가
                        }}
                        onClick={() => goToBoardDetail(board.id)} // 게시글 상세 페이지로 이동
                    >
                        <div className="card" style={{ position: 'relative', flexDirection: 'column' }}>
                            {/* 이미지 부분 */}
                            <div className="col-12 p-0">
                                <img
                                    src={getDefaultImage(board.category)} // 카테고리별 이미지 부여
                                    alt="Board Image"
                                    className="card-img-top img-fluid"
                                    style={{ width: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            {/* 텍스트 부분 */}
                            <div className="col-12 d-flex flex-column justify-content-center text-center p-2">
                                <div className="card-body">
                                    <h3 className="card-title" style={{ marginTop: '5px' }}>{board.title}</h3>
                                    <p className="card-text" style={{ marginTop: '2px' }}>{board.content}</p>
                                </div>
                                <div className="d-flex justify-content-between" style={{ padding: '10px' }}>
                                    <span>좋아요: {board.likeCount} </span>
                                    <span>조회수: {board.viewCount} </span>
                                    <span>댓글 수: {board.commentCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                <button
                                    onClick={() => handlePageChange(i + 1)}
                                    className="page-link"
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AllBoards;
