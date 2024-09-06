import React, { useState } from 'react';
import { getCookie } from "../../../../utils/CookieUtil";
import { useNavigate } from 'react-router-dom';
import './CreateBoard.css'; // 추가 스타일 적용

const CreateBoard = () => {
    const [title, setTitle] = useState(''); // 제목 상태 관리
    const [content, setContent] = useState(''); // 내용 상태 관리
    const [isImportant, setIsImportant] = useState(false); // 중요 여부 상태 관리
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const [category, setCategory] = useState(''); // 카테고리 상태 관리 (문자열로 저장됨)
    const [error, setError] = useState(null); // 에러 상태 관리
    const accessToken = getCookie('accessToken');
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        setFiles(e.target.files); // 선택한 파일들을 상태에 저장
    };

    // 게시글 생성 요청을 보내는 함수
    const createBoard = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

        try {
            // FormData 객체 생성
            const formData = new FormData();

            // JSON 데이터를 FormData에 추가 (category는 문자열로 전송됨)
            const data = { title, content, isImportant, category };
            formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

            // 파일이 있을 경우에만 추가
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }
            }

            const response = await fetch('/api/v1/boards', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData // FormData를 body에 전달
            });

            if (!response.ok) {
                throw new Error('게시글 생성 실패');
            }
            await response.json();
            // 게시글 생성 후 전체 게시판 페이지로 이동
            navigate('/all-boards');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="create-board-container">
            <h2>게시글 작성</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={createBoard} className="create-board-form">
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="textarea-field"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={isImportant}
                            onChange={(e) => setIsImportant(e.target.checked)}
                        />
                        중요 게시글로 표시
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="category">카테고리</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="input-field"
                    >
                        <option value="">카테고리를 선택하세요</option>
                        <option value="전체 알림">전체 알림</option>
                        <option value="협업">협업</option>
                        <option value="회의실">회의실</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="files">파일 첨부 (선택 사항)</label>
                    <input
                        type="file"
                        id="files"
                        multiple
                        onChange={handleFileChange}
                        className="input-field"
                    />
                </div>

                <button type="submit" className="submit-button">작성하기</button>
            </form>
        </div>
    );
};

export default CreateBoard;
