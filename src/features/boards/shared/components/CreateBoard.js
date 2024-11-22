import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateBoard.css';
import { imagePrefix } from "../../../../utils/Constant";
import useBoardForm from "../../general/hooks/useBoardForm";
import { createAllBoards, createDepartmentBoards } from "../services/BoardsService";

const CreateBoard = () => {
    const navigate = useNavigate();
    const { department } = useParams();

    const {
        title, setTitle,
        content, setContent,
        isImportant, toggleImportant,
        isLocked, toggleIsLocked,
        files, handleFileChange,
        category, setCategory,
        error, setError,
        isFileInputActive, toggleFileInput,
    } = useBoardForm();

    const createBoard = async (e) => {
        e.preventDefault();
        try {
            if (department) {
                // 부서 게시판 요청에 isLocked 포함
                const data = { title, content, isImportant, isLocked, category };
                await createDepartmentBoards(department, data, files);
            } else {
                // 전체 게시판 요청에 isLocked 제외
                const data = { title, content, isImportant, category };
                await createAllBoards(data, files);
            }

            // 작성 후 적절한 게시판으로 이동
            if (department) {
                navigate(`/department-boards/${department}`);
            } else {
                navigate('/all-boards');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="create-board-title">
                {department ? `${department} 게시판 작성` : "전체 게시글 작성"}
            </h2>
            <div className="create-board-container">
                <div className="create-board-container-left">
                    <div className="create-board-card-settings">
                        <img
                            src={isImportant
                                ? `${imagePrefix}/shared/isImportant_true.png`
                                : `${imagePrefix}/shared/isImportant_false.png`}
                            alt={isImportant ? "Important" : "Not Important"}
                            onClick={toggleImportant}
                        />

                        {/* isLocked는 부서 게시판에서만 활성화 */}
                        {department && (
                            <img
                                src={isLocked
                                    ? `${imagePrefix}/shared/lock.png`
                                    : `${imagePrefix}/shared/unlock.png`}
                                alt={isLocked ? "Locked" : "Unlocked"}
                                onClick={toggleIsLocked}
                            />
                        )}
                    </div>

                    <div className="file-placeholder">
                        <img
                            src={`${imagePrefix}/shared/attachments_files.png`}
                            alt="File Placeholder"
                            onClick={toggleFileInput}
                        />
                    </div>

                    {/* File Input */}
                    {isFileInputActive && (
                        <div className="form-group file-input-group">
                            <input
                                type="file"
                                id="files"
                                multiple
                                onChange={handleFileChange}
                                className="input-field file-input"
                            />
                        </div>
                    )}

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="attached-files">
                            <strong>첨부 파일:</strong>
                            <ul>
                                {files.length <= 3 ? (
                                    files.slice(0, files.length).map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))
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

                {/* Right Section */}
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
