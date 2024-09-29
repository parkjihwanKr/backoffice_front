import React from 'react';
import './DownloadButton.css'; // CSS 파일을 import

const DownloadButton = ({ fileList, imagePrefix }) => {
    // 파일 다운로드 함수
    const downloadFile = (fileUrl) => {
        console.log("fileUrl : "+fileUrl);
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

    return (
        <div className="download-button-container">
            {fileList.map((fileUrl, index) => (
                <button
                    key={index}
                    onClick={() => downloadFile(fileUrl)}
                    className="download-button"
                    style={{ color: 'black' }}
                >
                    <img
                        src={`${imagePrefix}/shared/attachments.png`}
                        style={{ height: '24px', width: '24px', marginRight: '5px' }}
                    />
                    파일 다운로드 {index + 1}
                </button>
            ))}
        </div>
    );
};

export default DownloadButton;
