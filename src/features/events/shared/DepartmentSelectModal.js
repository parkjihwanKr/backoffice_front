/*DepartmentSelectModal.js*/
import React, { useState } from 'react';
import './DepartmentSelectModal.css'; // 모달 스타일링

const DepartmentSelectModal = ({ on_close, on_select }) => {
    const [departments] = useState(['HR', 'FINANCE', 'IT', 'MARKETING', 'SALES', 'AUDIT']); // 부서 목록
    const [selected_department, set_selected_department] = useState(''); // 선택된 부서

    const handle_department_change = (e) => {
        set_selected_department(e.target.value);
    };

    const handle_submit = () => {
        if (selected_department) {
            on_select(selected_department); // 선택한 부서를 부모 컴포넌트로 전달
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>어떤 부서의 일정표로 이동하시겠습니까?</h3>
                <select value={selected_department} onChange={handle_department_change}>
                    <option value="">부서를 선택하세요</option>
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
                <div className="modal-footer">
                    <button onClick={on_close}>닫기</button>
                    <button onClick={handle_submit} disabled={!selected_department}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentSelectModal;
