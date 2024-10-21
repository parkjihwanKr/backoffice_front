import React from 'react';
import { imagePrefix } from "../../../utils/Constant";
import './FilterImageButton.css'; // 스타일 추가

const FilterImageButton = ({ onClick }) => {
    return (
        <img
            src={`${imagePrefix}/shared/filter.png`}
            alt="필터 아이콘"
            className="filter-image-button"
            onClick={onClick} // 클릭 이벤트를 외부에서 받음
        />
    );
};

export default FilterImageButton;
