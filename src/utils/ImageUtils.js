import {imagePrefix} from "./Constant";

export const defaultImageUrls = [
    `${imagePrefix}/board/brainstorming.png`,
    `${imagePrefix}/board/workshop.png`,
    `${imagePrefix}/board/communication.png`,
];

export const getDefaultImage = (index) => {
    return defaultImageUrls[index % defaultImageUrls.length];
};

// 파일명 추출 함수
export const extractFileName = (fileUrl, prefix) => {
    if (!fileUrl.startsWith(prefix)) return fileUrl; // prefix와 다르면 원본 반환
    const trimmedUrl = fileUrl.replace(prefix, ''); // prefix 제거
    const uuidIndex = trimmedUrl.indexOf('_') + 1; // UUID 뒤의 인덱스 찾기
    return trimmedUrl.substring(uuidIndex); // UUID 뒤의 파일명 반환
};