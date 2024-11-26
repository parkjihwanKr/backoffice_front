import React, { useState } from 'react';
import './DownloadButton.css';
import {ec2serverPrefix, MAX_FILENAME_LENGTH} from "../../../utils/Constant";
import {extractFileName} from "../../../utils/ImageUtils";
import {truncateFileName} from "../../../utils/FileUtils";

const DownloadButton = ({ fileList, imagePrefix }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 파일 다운로드 함수
    const downloadFile = (fileUrl) => {
        const actualUrl = typeof fileUrl === 'string' ? fileUrl : fileUrl.url; // URL 추출

        fetch(actualUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = actualUrl.split('/').pop(); // 파일명을 URL에서 추출
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url); // URL 객체 해제
            })
            .catch(() => alert('파일 다운로드에 실패했습니다.'));
    };

    // 드롭다운 토글 핸들러
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="download-button-container">
            <button
                className="download-button"
                onClick={toggleDropdown}
            >
                <img
                    src={`${imagePrefix}/shared/attachments.png`}
                    alt="Attachments"
                />
                파일 다운로드 ({fileList.length})
            </button>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
                <ul className="file-dropdown-menu">
                    {fileList.map((fileUrl, index) => {
                        const fileName = extractFileName(fileUrl, ec2serverPrefix);
                        const truncatedFileName = truncateFileName(fileName, MAX_FILENAME_LENGTH);

                        return (
                            <li
                                key={index}
                                onClick={() => downloadFile(fileUrl)}
                                className="file-dropdown-item"
                            >
                                파일 {index + 1}: {truncatedFileName}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default DownloadButton;
