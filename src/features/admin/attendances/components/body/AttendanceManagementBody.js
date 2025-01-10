import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../../utils/LoadingUtils";
import useAttendanceManagementBody from "../../hooks/useAttendanceManagementBody";

const AttendanceManagementBody = ({ attendanceList, loading }) => {
    const navigate = useNavigate();
    const { renderTable } = useAttendanceManagementBody(navigate, attendanceList);

    const loadingJSX = useLoading(loading);
    if (loadingJSX) return loadingJSX;

    if (!attendanceList || attendanceList.length === 0) {
        return <div className="not-exist-data">해당 데이터가 존재하지 않습니다.</div>;
    }

    return <div className="attendance-management-body">{renderTable()}</div>;
};

export default AttendanceManagementBody;
