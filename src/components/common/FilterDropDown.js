import React from 'react';
import './FilterDropDown.css';
import CloseImageButton from "../ui/image/CloseImageButton";

const FilterDropDown = ({
                            showFilters,
                            filters,
                            setFilters,
                            filterOptions,
                            onSubmit,
                            onReset,
                            setShowFilters,
                            showResetButton = true,
                        }) => {
    if (!showFilters) return null;

    return (
        <div className="custom-filters-dropdown">
            <h3 className="custom-filters-dropdown-header">필터 적용</h3>
            <CloseImageButton handleClose={() => setShowFilters(!showFilters)} />
            {filterOptions.map((filter) => {
                if (filter.type === 'select') {
                    return (
                        <div key={filter.name}
                             className={`custom-filter-item ${filter.type === 'checkbox' ? 'checkbox-item' : ''}`}>
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
                } else if (filter.type === 'checkbox') {
                    return (
                        <div key={filter.name} className="custom-filter-item my-checkbox-item">
                            <label htmlFor={filter.name}>{filter.label}</label>
                            <input
                                type="checkbox"
                                id={filter.name}
                                checked={!!filters[filter.name]}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        [filter.name]: e.target.checked || null,
                                    })
                                }
                            />
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
