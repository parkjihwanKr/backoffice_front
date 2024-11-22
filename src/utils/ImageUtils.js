import {imagePrefix} from "./Constant";

export const defaultImageUrls = [
    `${imagePrefix}/board/brainstorming.png`,
    `${imagePrefix}/board/workshop.png`,
    `${imagePrefix}/board/communication.png`,
];

export const getDefaultImage = (index) => {
    return defaultImageUrls[index % defaultImageUrls.length];
};