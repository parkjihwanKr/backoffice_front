// useDepartmentScheduleHeader.js
import { useMemo } from 'react';
import { useAuth } from '../../../auth/context/AuthContext';
import { useParams } from 'react-router-dom';
import { reverseDepartmentMapping } from '../../../../utils/Constant';

export const useDepartmentScheduleHeader = (currentYear, currentMonth) => {
    const { isAuthenticated, name, department: userDepartment, position: userPosition } = useAuth();
    const { department } = useParams();

    const departmentMember = useMemo(() => isAuthenticated && userDepartment === department, [isAuthenticated, userDepartment, department]);
    const isAdmin = useMemo(() => userPosition === 'CEO', [userPosition]);
    const title = useMemo(() => `${reverseDepartmentMapping[department]} 부서 일정표 - ${currentYear}년 ${currentMonth + 1}월`, [department, currentYear, currentMonth]);

    return {
        isAuthenticated,
        departmentMember,
        isAdmin,
        title,
    };
};