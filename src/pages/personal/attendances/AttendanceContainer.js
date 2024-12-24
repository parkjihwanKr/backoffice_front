import React, {useEffect, useState} from "react";
import {useAuth} from "../../../features/auth/context/AuthContext";
import {imagePrefix, reverseAttendanceMapping} from "../../../utils/Constant";
import {useNavigate} from "react-router-dom";
import MemberAttendanceDetails from "../../../features/members/components/attendances/MemberAttendanceDetails";

const AttendanceContainer = ( {data}) => {

    const dateEnum = ["월", "화", "수", "목", "금", "토", "일"];
    const {name, id} = useAuth();
    const [memberAttendances, setMemberAttendances] = useState([]);
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.attendances) {
            setMemberAttendances(data.attendances);
        }
    }, [data]);

    const openModal = (attendance) => {
        setSelectedAttendance(attendance);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAttendance(null);
    };

    const goToMemberAttendances = () => {
        navigate(`/members/${id}/attendance`);
    }

    return(
        <div className="attendances-container">
            <div className="attendances-container-header">
                '{name}' 님의 이번주 근태 기록표
                <img
                    src={`${imagePrefix}/shared/reply.png`}
                    alt={"바로 가기"}
                    onClick={goToMemberAttendances}
                />
            </div>
            <div className="attendances-container-body">
                {memberAttendances && memberAttendances.length > 0 ? (
                    <div className="attendances-grid">
                        {memberAttendances.map((attendance, index) => {
                            const checkInDate = attendance.checkInTime
                                ? new Date(attendance.checkInTime)
                                : null;

                            return (
                                <div
                                    key={attendance.attendanceId}
                                    className="personal-attendances-item"
                                    onClick={() => openModal(attendance)}
                                >
                                    {/* 요일과 날짜 표시 */}
                                    <div className="personal-attendances-item-index">
                                        {checkInDate
                                            ? `${checkInDate.getMonth() + 1} / ${checkInDate.getDate()} ${dateEnum[checkInDate.getDay()]}`
                                            : `${dateEnum[index % 7]} (날짜 없음)`}
                                    </div>
                                    {/* 근태 상태 */}
                                    <div className="personal-attendances-item-index">
                                        {reverseAttendanceMapping[attendance.attendanceStatus]}
                                    </div>
                                    {/* 출근 시간 */}
                                    <div className="personal-attendances-item-index">
                                        출근 : {attendance.checkInTime === null
                                        ? " 기록 없음 "
                                        : new Intl.DateTimeFormat("ko-KR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        }).format(new Date(attendance.checkInTime))}
                                    </div>
                                    {/* 퇴근 시간 */}
                                    <div className="personal-attendances-item-index">
                                        퇴근 : {attendance.checkOutTime === null
                                        ? " 기록 없음 "
                                        : new Intl.DateTimeFormat("ko-KR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        }).format(new Date(attendance.checkOutTime))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>근태 기록 목록이 없습니다.</p>
                )}
            </div>
            <div className="attendances-container-footer">
                ★ 출근 시간 또는 퇴근 시간이 기록되지 않았다면, 상단 버튼을 통해 출근 상태를 업데이트 해주세요!
            </div>
            {modalOpen && (
                <MemberAttendanceDetails
                    attendanceData={selectedAttendance}
                    selectedDate={
                        selectedAttendance && selectedAttendance.checkInTime
                            ? {
                                year: new Date(selectedAttendance.checkInTime).getFullYear(),
                                month: new Date(selectedAttendance.checkInTime).getMonth() + 1,
                                day: new Date(selectedAttendance.checkInTime).getDate(),
                            }
                            : null
                    }
                    onClose={closeModal}
                    isOpen={modalOpen}
                />
            )}
        </div>
    );
}
export default AttendanceContainer;