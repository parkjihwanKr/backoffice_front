import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../../utils/CookieUtil";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 적용
import './AllBoard.css'; // CSS 파일 import

// AllBoards 컴포넌트
const AllBoards = () => {
    // 상태 정의
    const [boards, setBoards] = useState([]); // 게시글 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 8; // 한 페이지에 보여줄 게시글 수
    const accessToken = getCookie('accessToken'); // 쿠키에서 토큰 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

    // S3 이미지 경로 및 기본 이미지 URL 배열
    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';
    const defaultImageUrls = [
        `${imagePrefix}/board/brainstorming.png`,
        `${imagePrefix}/board/workshop.png`,
        `${imagePrefix}/board/communication.png`
    ];

    // 페이지네이션을 적용한 게시글 목록 계산
    const indexOfLastBoard = currentPage * itemsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
    const currentBoards = boards.slice(indexOfFirstBoard, indexOfLastBoard);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(boards.length / itemsPerPage);

    // 기본 이미지를 순서대로 할당하는 함수
    const getDefaultImage = (index) => {
        return defaultImageUrls[index % defaultImageUrls.length];
    };

    // 게시판 데이터를 서버에서 가져오는 함수
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
            console.log(data.content); // 데이터 확인을 위해 콘솔에 출력
            setBoards(data.content); // 게시글 목록 설정
            setLoading(false); // 로딩 완료
        } catch (error) {
            setError(error.message); // 에러 상태 업데이트
            setLoading(false); // 로딩 완료
        }
    };

    // 컴포넌트가 처음 렌더링될 때 서버에서 게시글 목록을 가져옴
    useEffect(() => {
        fetchBoards();
    }, [accessToken]);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 게시글 클릭 시 상세 페이지로 이동하는 함수
    const handleCardClick = (boardId) => {
        console.log(boardId); // 클릭된 게시글의 ID 확인
        if (boardId) {
            navigate(`/all-boards/${boardId}`); // 상세 페이지로 이동
        } else {
            console.error('boardId is undefined'); // boardId가 없으면 오류 출력
        }
    };

    // 로딩 중일 때 출력할 메시지
    if (loading) {
        return <p>Loading...</p>;
    }

    // 에러가 발생했을 때 출력할 메시지
    if (error) {
        return <p>Error: {error}</p>;
    }

    // UI 렌더링
    return (
        <div className="container">
            {/* 공지 사항 타이틀 중앙 정렬 */}
            <div className="d-flex justify-content-center mb-3">
                <h2>공지 사항</h2>
            </div>

            {/* 새 게시글 작성 버튼 */}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/create-board">
                    <button className="btn btn-primary">새 게시글 작성</button>
                </Link>
            </div>

            {/* 게시판 카드 목록 */}
            <div className="row">
                {currentBoards.map((board, index) => (
                    <div
                        className="col-md-12 mb-3"
                        key={board.boardId || index}
                        onClick={() => handleCardClick(board.boardId)} // 클릭 시 상세 페이지로 이동
                        style={{ cursor: 'pointer' }} // 커서 스타일 변경
                    >
                        <div className="card">
                            <div className="row no-gutters d-flex">
                                {/* 중요 게시물 아이콘 */}
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '0px',
                                    zIndex: '1'
                                }}>
                                    <img
                                        src={board.isImportant ? `${imagePrefix}/shared/isImportant_true.png` : `${imagePrefix}/shared/isImportant_false.png`}
                                        alt={board.isImportant ? "Important" : "Not Important"}
                                        width="30"
                                    />
                                </div>
                                {/* 왼쪽: 게시물 이미지 */}
                                <div className="col-md-6">
                                    <img
                                        src={getDefaultImage(index)}
                                        alt="Board Image"
                                        className="card-img-left"
                                    />
                                </div>
                                {/* 오른쪽: 게시물 텍스트 */}
                                <div className="col-md-6 d-flex flex-column justify-content-center text-center">
                                    <div className="card-body">
                                        <h3 className="card-title">{board.title}</h3>
                                        <p className="card-text">{board.content}</p>
                                    </div>

                                    {/* 좋아요, 조회수, 댓글 수 */}
                                    <div className="hover-info d-flex justify-content-between">
                                        <span>
                                            <img src={`${imagePrefix}/shared/likes.png`} alt="likes"
                                                 style={{ width: '20px', height: '20px' }}/> {board.likeCount}
                                        </span>
                                        <span>
                                            <img src={`${imagePrefix}/shared/viewCount.png`} alt="views"
                                                 style={{ width: '20px', height: '20px' }}/> {board.viewCount}
                                        </span>
                                        <span>
                                            <img src={`${imagePrefix}/shared/speech_balloon.png`} alt="comments"
                                                 style={{ width: '25px', height: '20px' }}/> {board.commentCount}
                                        </span>
                                    </div>
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
