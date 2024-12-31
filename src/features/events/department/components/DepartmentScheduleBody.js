import React, { useState } from 'react';
import EventDetailModal from './modal/EventDetailModal'; // 모달 컴포넌트 가져오기

const DepartmentScheduleBody = ({ currentYear, currentMonth, schedules, onUpdateEvent, onDeleteEvent }) => {
    const [selectedEvent, setSelectedEvent] = useState(null); // 클릭된 이벤트를 저장하는 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    // 해당 월의 마지막 날짜 가져오기
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날을 반환
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    // 일정 데이터를 createdAt 기준으로 정렬
    const sortedSchedules = schedules.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // 각 날짜에 대한 이벤트 배치를 위한 빈 행 배열을 만듭니다.
    // 각 이벤트는 고유한 행에만 배치되고 다른 이벤트가 해당 행에 들어가지 않습니다.
    const calendarGrid = Array(sortedSchedules.length).fill([]).map(() => Array(daysInMonth).fill(null));

    // 각 이벤트를 그 시작일~종료일 범위에 추가 (각 이벤트는 하나의 행에만 배치)
    sortedSchedules.forEach((schedule, index) => {
        const startDay = new Date(schedule.startDate).getDate() - 1; // 0-based index
        const endDay = new Date(schedule.endDate).getDate() - 1; // 0-based index

        // 해당 이벤트의 범위 내에서 이벤트를 해당 행(index)에 추가합니다.
        for (let day = startDay; day <= endDay; day++) {
            calendarGrid[index][day] = schedule;
        }
    });

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    // 날짜 헤더 생성 함수 (첫 번째 행)
    const renderDayHeaders = () => {
        return [...Array(daysInMonth)].map((_, day) => {
            const currentDate = new Date(currentYear, currentMonth, day + 1); // 날짜 생성
            const dayOfWeek = currentDate.getDay(); // 0: 일요일, 6: 토요일

            // 스타일 클래스 설정
            const headerClass = dayOfWeek === 6 ? 'saturday-header' : dayOfWeek === 0 ? 'sunday-header' : '';

            return (
                <th key={day} className={headerClass}>
                    {day + 1} {/* 1일부터 시작 */}
                </th>
            );
        });
    };

    // 일정 행을 렌더링하는 함수
    const renderScheduleRows = () => {
        return calendarGrid.map((row, rowIndex) => (
            <tr key={rowIndex + 1}> {/* 첫 행은 날짜이므로 +1 */}
                {row.map((schedule, dayIndex) => {
                    if (!schedule) return <td key={dayIndex}></td>; // 일정이 없는 경우 빈 셀

                    // 병합해야 할 날짜 범위를 계산
                    const startDay = new Date(schedule.startDate).getDate() - 1; // 0-based index
                    const endDay = new Date(schedule.endDate).getDate() - 1; // 0-based index
                    const colSpan = endDay - startDay + 1; // 병합할 셀의 수

                    // 일정이 시작되는 첫 날에만 제목과 colSpan을 적용하여 병합
                    if (dayIndex === startDay) {
                        return (
                            <td key={dayIndex} colSpan={colSpan} onClick={() => handleEventClick(schedule)}>
                                <div>
                                    <strong>{schedule.title}</strong>
                                </div>
                            </td>
                        );
                    }

                    // 나머지 날짜는 병합되므로 빈 셀로 처리
                    return null;
                })}
            </tr>
        ));
    };

    // 모달을 열고 이벤트 데이터를 설정하는 함수
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="schedule-body">
            <table className="calendar-table">
                <thead>
                <tr>
                    {renderDayHeaders()} {/* 날짜를 헤더로 표시 */}
                </tr>
                </thead>
                <tbody>
                    {renderScheduleRows()} {/* 정렬된 일정을 여러 행에 걸쳐 렌더링 */}
                </tbody>
            </table>

            <EventDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={selectedEvent}
                onUpdate={onUpdateEvent}
                onDelete={onDeleteEvent}
            />
        </div>
    );
};

export default DepartmentScheduleBody;
