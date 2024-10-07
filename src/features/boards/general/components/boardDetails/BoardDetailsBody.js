import React from 'react';
import DownloadButton from '../../../../../components/ui/button/DownloadButton';

const BoardDetailsBody = ({ board, imagePrefix }) => {
    return (
        <div className="card-body">
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <span>작성자: {board.author} ({board.department}, {board.position})</span><br />
                <span>작성일: {new Date(board.createdAt).toLocaleString()}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: board.content.replace(/\n/g, '<br />') }}></p>

            {/* 파일 다운로드 버튼 */}
            {board.fileList && <DownloadButton fileList={board.fileList} imagePrefix={imagePrefix}/>}
        </div>
    );
};

export default BoardDetailsBody;
