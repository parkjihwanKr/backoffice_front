export const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) return fileName; // 길이가 초과되지 않으면 그대로 반환
    return `${fileName.substring(0, maxLength)}...`; // 초과 시 앞부분과 "..." 추가
};
