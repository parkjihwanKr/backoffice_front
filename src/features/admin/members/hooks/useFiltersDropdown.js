import { useState } from "react";
import { departmentMapping, positionMapping } from "../../../../utils/Constant"; // 매핑 테이블 임포트

const useFiltersDropdown = (initialPosition = 'MANAGER', initialDepartment = 'HR') => {
    const [position, setPosition] = useState(initialPosition);
    const [department, setDepartment] = useState(initialDepartment);
    const [showFilters, setShowFilters] = useState(false);

    // 필터 창 열기/닫기
    const toggleFilterDropdown = () => {
        setShowFilters(prevState => !prevState);
    };

    // 필터 적용 후 서버에 맞는 값을 변환하여 전달
    const applyFilters = (onFilterChange) => {
        const mappedPosition = positionMapping[position] || position;
        const mappedDepartment = departmentMapping[department] || department;

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
