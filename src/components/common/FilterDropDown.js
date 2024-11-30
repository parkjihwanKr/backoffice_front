import React from 'react';
import './FilterDropDown.css';

const FilterDropDown = ({
                            showFilters,
                            filters,
                            setFilters,
                            filterOptions,
                            onSubmit,
                            onReset,
                            toggleDropdown,
                            showResetButton = true, // 기본값 true
                        }) => {
    if (!showFilters) return null;

    return (
        <div className="custom-filters-dropdown">
            {filterOptions.map((filter) => {
                if (filter.type === 'select') {
                    return (
                        <div key={filter.name} className="custom-filter-item">
                            <label htmlFor={filter.name}>{filter.label}:</label>
                            <select
                                id={filter.name}
                                value={filters[filter.name] || ''}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        [filter.name]: e.target.value || null,
                                    })
                                }
                            >
                                <option value="">전체</option>
                                {filter.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                } else if (filter.type === 'input') {
                    return (
                        <div key={filter.name} className="custom-filter-item">
                            <label htmlFor={filter.name}>{filter.label}:</label>
                            <input
                                id={filter.name}
                                type={filter.inputType}
                                placeholder={filter.placeholder}
                                value={filters[filter.name] || ''}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        [filter.name]: e.target.value || null,
                                    })
                                }
                            />
                        </div>
                    );
                }
                return null;
            })}

            <div className="custom-filter-actions">
                <button onClick={onSubmit}>조회</button>
                {showResetButton && <button onClick={onReset}>전체 보기</button>}
            </div>
        </div>
    );
};

export default FilterDropDown;
