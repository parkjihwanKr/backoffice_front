import { useState } from 'react';

const useFilterState = (initialFilters) => {
    const [localFilters, setLocalFilters] = useState({ ...initialFilters });

    const updateFilter = (name, value) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value || null, // 빈 문자열은 null로 처리
        }));
    };

    const resetFilters = () => {
        setLocalFilters({ ...initialFilters }); // 초기값으로 리셋
    };

    return {
        localFilters,
        updateFilter,
        resetFilters,
    };
};

export default useFilterState;
