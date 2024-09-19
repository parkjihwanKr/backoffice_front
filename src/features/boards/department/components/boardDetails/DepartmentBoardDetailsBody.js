import React from 'react';
import DownloadButton from './DownloadButton'; // Assuming you have this component already

const DepartmentBoardDetailsBody = ({ board, imagePrefix }) => {
    return (
        <div className="card-body">
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <span>작성자: {board.author} ({board.department}, {board.position})</span><br />
                <span>작성일: {new Date(board.createdAt).toLocaleString()}</span>
            </div>

            {/* board.content가 빈 문자열 또는 null일 경우 기본값 설정 */}
            <p dangerouslySetInnerHTML={{ __html: board.content ? board.content.replace(/\n/g, '<br />') : '내용이 없습니다.' }}></p>

            {/* 파일 다운로드 버튼 */}
            {board.fileList && <DownloadButton fileList={board.fileList} imagePrefix={imagePrefix} />}
        </div>
    );
};

export default DepartmentBoardDetailsBody;
