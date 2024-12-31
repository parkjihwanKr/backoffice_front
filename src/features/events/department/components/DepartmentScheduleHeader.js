import React, { useEffect } from 'react';
import { useAuth } from "../../../auth/context/AuthContext";
import { useParams } from "react-router-dom";
import {imagePrefix, reverseDepartmentMapping} from '../../../../utils/Constant';

const DepartmentScheduleHeader = ({ currentYear, currentMonth, onCreateModal }) => {
    const { isAuthenticated, name, department: userDepartment, position: userPosition } = useAuth();
    const { department } = useParams();

    const departmentMember = isAuthenticated && userDepartment === department;
    const isAdmin = userPosition === 'CEO';

    useEffect(() => {
    }, [name, department, departmentMember]);

    if (!isAuthenticated) {
        return <div>로그인이 필요합니다.</div>;
    }

    return (
        <div className="schedule-header">
            {/* 부서 일정표 제목 */}
            <h2 className="schedule-title">{reverseDepartmentMapping[department]} 부서 일정표 - {currentYear}년 {currentMonth + 1}월</h2>

            {/* 부서 인원 또는 관리자가 일정 작성/수정/삭제 가능 */}
            {(departmentMember || isAdmin) && (
                <div className="header-controls">
                    {/* 일정 생성 버튼 */}
                    <img
                        src={`${imagePrefix}/shared/edit-schedule.png`}
                        title="일정 만들기"
                        onClick={onCreateModal}  // 작성 모달 열기
                    />

                </div>
            )}
        </div>
    );
};

export default DepartmentScheduleHeader;
