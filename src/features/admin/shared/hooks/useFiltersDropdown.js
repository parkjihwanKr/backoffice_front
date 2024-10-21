import { useState } from "react";
import { departmentMapping, positionMapping } from "../../../../utils/Constant"; // 매핑 테이블 임포트

const useFiltersDropdown = (initialPosition = null, initialDepartment = null) => {
    const [position, setPosition] = useState(initialPosition);
    const [department, setDepartment] = useState(initialDepartment);
    const [showFilters, setShowFilters] = useState(false);

    // 필터 창 열기/닫기
    const toggleFilterDropdown = () => {
        setShowFilters(prevState => !prevState);
    };

    // 필터링 적용
    const applyFilters = (onFilterChange) => {
        // '전체'일 경우 null로 변환, 그렇지 않으면 매핑된 값을 사용
        const mappedPosition = position === "전체" ? null : (positionMapping[position] || position);
        const mappedDepartment = department === "전체" ? null : (departmentMapping[department] || department);

        onFilterChange({ position: mappedPosition, department: mappedDepartment });
        setShowFilters(false); // 필터 창 닫기
    };


    return {
        position,
        setPosition,
        department,
        setDepartment,
        showFilters,
        toggleFilterDropdown,
        applyFilters
    };
};

export default useFiltersDropdown;
