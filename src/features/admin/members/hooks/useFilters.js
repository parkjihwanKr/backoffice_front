import { useState } from 'react';

const useFilters = (initialFilters = { position: null, department: null }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return { filters, handleFilterChange };
};

export default useFilters;