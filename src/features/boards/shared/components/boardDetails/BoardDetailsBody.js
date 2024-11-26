import React from 'react';
import './BoardDetailsBody.css';
import DownloadButton from '../../../../../components/ui/buttons/DownloadButton';
import {imagePrefix} from "../../../../../utils/Constant";
import {useAuth} from "../../../../auth/context/AuthContext";

const BoardDetailsBody = ({ board }) => {
    const {name, department, position} = useAuth();

    return (
        <div className="board-details-card-body">
            <div className="board-details-user-info">
                <span>작성자: {name} ({department}, {position})</span><br />
                <span>작성일: {new Date(board.createdAt).toLocaleString()}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: board.content.replace(/\n/g, '<br />') }}></p>

            {/* 파일 다운로드 버튼 */}
            {board.fileList
                && <DownloadButton
                    fileList={board.fileList}
                    imagePrefix={imagePrefix}/>}
        </div>
    );
};

export default BoardDetailsBody;
