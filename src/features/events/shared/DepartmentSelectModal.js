import React, { useState } from 'react';
import './DepartmentSelectModal.css'; // 모달 스타일링

const DepartmentSelectModal = ({ on_close, on_select }) => {
    const [departments] = useState(['HR', 'FINANCE', 'IT', 'MARKETING', 'SALES', 'AUDIT']);
    const [selected_department, set_selected_department] = useState('');

    const handle_department_change = (e) => {
        set_selected_department(e.target.value);
    };

    const handle_submit = () => {
        if (selected_department) {
            on_select(selected_department);
        }
    };

    return (
        <div className="department-select-modal">
            <div className="department-select-modal-content">
                <h3>어떤 부서의 일정표로 이동하시겠습니까?</h3>
                <select value={selected_department} onChange={handle_department_change}>
                    <option value="">부서를 선택하세요</option>
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
                <div className="department-select-modal-footer">
                    <button
                        className="department-select-modal-footer-check-button"
                        onClick={handle_submit} disabled={!selected_department}>
                        확인
                    </button>
                    <button
                        className="department-select-modal-footer-close-button"
                        onClick={on_close}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentSelectModal;
