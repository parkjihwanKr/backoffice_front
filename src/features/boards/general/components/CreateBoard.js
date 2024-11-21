import React, { useState } from 'react';
import { getCookie } from "../../../../utils/CookieUtil";
import { useNavigate } from 'react-router-dom';
import './CreateBoard.css';
import { imagePrefix } from "../../../../utils/Constant";

const CreateBoard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [isFileInputActive, setIsFileInputActive] = useState(false);
    const accessToken = getCookie('accessToken');
    const navigate = useNavigate();

    const toggleFileInput = () => {
        setIsFileInputActive(true);
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // 상태를 파일 배열로 설정
    };

    const toggleImportant = (e) => {
        e.stopPropagation(); // 부모 요소 클릭 이벤트 방지
        setIsImportant((prev) => !prev);
    };

    const createBoard = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const data = { title, content, isImportant, category };
            formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

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
                body: formData
            });

            if (!response.ok) {
                throw new Error('게시글 생성 실패');
            }
            await response.json();
            navigate('/all-boards');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="create-board-title">게시글 작성</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="create-board-container">
                {/* 왼쪽 영역 */}
                <div className="create-board-container-left" onClick={toggleFileInput}>
                    <div className="create-board-card-important" onClick={toggleImportant}>
                        <img
                            src={isImportant
                                ? `${imagePrefix}/shared/isImportant_true.png`
                                : `${imagePrefix}/shared/isImportant_false.png`}
                            alt={isImportant ? "Important" : "Not Important"}
                            width="30"
                        />
                        중요
                    </div>

                    {isFileInputActive ? (
                        <div className="form-group file-input-group">
                            <input
                                type="file"
                                id="files"
                                multiple
                                onChange={handleFileChange}
                                className="input-field file-input"
                            />
                        </div>
                    ) : (
                        <img
                            src={`${imagePrefix}/shared/attachments_files.png`}
                            alt="File Placeholder"
                            className="file-placeholder"
                        />
                    )}

                    {/* 첨부 파일 리스트 */}
                    {files.length > 0 && (
                        <div className="attached-files">
                            <strong>첨부 파일:</strong>
                            <ul>
                                {files.length === 1 ? (
                                    <li>{files[0].name}</li>
                                ) : (
                                    <>
                                        <li>{files[0].name}</li>
                                        <li>...</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* 오른쪽 영역 */}
                <div className="create-board-container-right">
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
                            <label htmlFor="content">내용</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                className="textarea-field"
                            ></textarea>
                        </div>

                        <div className="board-submit-button-container">
                            <button type="submit" className="board-submit-button">작성하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBoard;
