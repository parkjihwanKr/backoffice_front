import React, { useState, useEffect } from 'react';
import { getCookie } from "../../../../utils/CookieUtil";
import { Link, useNavigate, useParams } from 'react-router-dom'; // useParams 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 적용
import './DepartmentBoard.css'; // CSS 파일 import

const DepartmentBoards = () => {
    const [departmentBoards, setDepartmentBoards] = useState([]); // 게시글 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 8; // 한 페이지에 보여줄 게시글 수
    const accessToken = getCookie('accessToken'); // 쿠키에서 토큰 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const { department } = useParams(); // URL에서 department 받아오기 (수정됨)

    const imagePrefix = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';
    const defaultImageUrls = [
        `${imagePrefix}/board/brainstorming.png`,
        `${imagePrefix}/board/workshop.png`,
        `${imagePrefix}/board/communication.png`
    ];

    const indexOfLastBoard = currentPage * itemsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - itemsPerPage;
    const currentBoards = departmentBoards.slice(indexOfFirstBoard, indexOfLastBoard);
    const totalPages = Math.ceil(departmentBoards.length / itemsPerPage);

    const getDefaultImage = (index) => {
        return defaultImageUrls[index % defaultImageUrls.length];
    };

    // 부서 게시판 데이터를 서버에서 가져오는 함수
    const fetchBoards = async () => {
        try {
            const response = await fetch(`/api/v1/departments/${department}/boards`, { // department를 경로에 포함 (수정됨)
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
            setDepartmentBoards(data.content); // 게시글 목록 설정
            setLoading(false); // 로딩 완료
        } catch (error) {
            setError(error.message); // 에러 상태 업데이트
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        fetchBoards(); // 컴포넌트가 렌더링될 때 데이터 가져오기
    }, [department, accessToken]); // department가 변경될 때마다 API 호출 (수정됨)

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
        <div className="container">
            <div className="d-flex justify-content-center mb-3">
                <h2>{department} 공지 사항</h2> {/* 부서 이름 출력 (수정됨) */}
            </div>

            <div className="d-flex justify-content-end mb-3">
                <Link to="/create-board">
                    <button className="btn btn-primary">새 게시글 작성</button>
                </Link>
            </div>

            <div className="row">
                {currentBoards.map((board, index) => (
                    <div
                        className="col-md-12 mb-3"
                        key={board.boardId || index}
                        onClick={() => handleCardClick(board.boardId)} // 클릭 시 상세 페이지로 이동
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card">
                            <div className="row no-gutters d-flex">
                                <div style={{ position: 'absolute', top: '10px', left: '0px', zIndex: '1' }}>
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
                                            <img src={`${imagePrefix}/shared/likes.png`} alt="likes" style={{ width: '20px', height: '20px' }} /> {board.likeCount}
                                        </span>
                                        <span>
                                            <img src={`${imagePrefix}/shared/viewCount.png`} alt="views" style={{ width: '20px', height: '20px' }} /> {board.viewCount}
                                        </span>
                                        <span>
                                            <img src={`${imagePrefix}/shared/commentList.png`} alt="comments" style={{ width: '25px', height: '20px' }} /> {board.commentCount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

export default DepartmentBoards;
