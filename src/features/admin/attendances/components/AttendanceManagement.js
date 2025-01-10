import React from "react";
import AttendanceManagementHeader from "./header/AttendanceManagementHeader";
import AttendanceManagementBody from "./body/AttendanceManagementBody";
import useAttendanceManagement from "../hooks/useAttendanceManagement";
import AttendanceManagementFooter from "./AttendanceManagementFooter";

const AttendanceManagement = () => {
    const {
        filters,
        attendanceList,
        totalPages,
        currentPage,
        loading,
        setCurrentPage,
        isFebruaryWith28Days,
        handleSetFilters,
        handleDeleteSuccess,
        handleAttendanceCreated,
    } = useAttendanceManagement();

    return (
        <div className="attendance-management-container">
            <AttendanceManagementHeader
                filters={filters}
                onFilterChange={handleSetFilters}
                onDeleteSuccess={handleDeleteSuccess}
                onAttendanceCreated={handleAttendanceCreated}
            />
            <AttendanceManagementBody
                attendanceList={attendanceList}
                loading={loading}
            />
            <AttendanceManagementFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isFebruaryWith28Days={isFebruaryWith28Days}
            />
        </div>
    );
};

export default AttendanceManagement;
