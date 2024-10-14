import VacationDetailModal from "./VacationDetailModal";
import { useState } from "react";

const VacationManagementBody = ({ currentYear, currentMonth, vacations = [], onUpdateVacationIsAccepted, onDeleteVacation }) => {
    const [selectedVacation, setSelectedVacation] = useState(null); // 선택된 휴가 저장
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    // 해당 월의 마지막 날짜 가져오기
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    // 휴가 데이터를 startDate 기준으로 정렬
    const sortedVacations = vacations.length > 0 ? vacations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];

    // 각 날짜에 대한 휴가 배치를 위한 빈 행 배열을 만듬
    const calendarGrid = Array(sortedVacations.length).fill([]).map(() => Array(daysInMonth).fill(null));

    // 각 휴가를 그 시작일~종료일 범위에 추가 (각 휴가는 하나의 행에만 배치)
    sortedVacations.forEach((vacation, index) => {
        const startDay = new Date(vacation.startDate).getDate() - 1; // 0-based index
        const endDay = new Date(vacation.endDate).getDate() - 1; // 0-based index

        // 해당 휴가의 범위 내에서 행에 추가
        for (let day = startDay; day <= endDay; day++) {
            calendarGrid[index][day] = vacation;
        }
    });

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVacation(null);
    };

    // 날짜 헤더 생성 함수
    const renderDayHeaders = () => {
        return [...Array(daysInMonth)].map((_, day) => {
            const currentDate = new Date(currentYear, currentMonth, day + 1);
            const dayOfWeek = currentDate.getDay(); // 0: 일요일, 6: 토요일

            const headerClass = dayOfWeek === 6 ? 'saturday-header' : dayOfWeek === 0 ? 'sunday-header' : '';

            return (
                <th key={day} className={headerClass}>
                    {day + 1}
                </th>
            );
        });
    };

    // 휴가 행을 렌더링하는 함수
    const renderVacationRows = () => {
        return calendarGrid.map((row, rowIndex) => (
            <tr key={rowIndex + 1}> {/* 첫 행은 날짜이므로 +1 */}
                {row.map((vacation, dayIndex) => {
                    if (!vacation) return <td key={dayIndex}></td>; // 휴가가 없는 경우 빈 셀

                    // 병합해야 할 날짜 범위 계산
                    const startDay = new Date(vacation.startDate).getDate() - 1;
                    const endDay = new Date(vacation.endDate).getDate() - 1;
                    const colSpan = endDay - startDay + 1;

                    // 휴가 시작 날짜에만 제목과 colSpan을 적용하여 병합
                    if (dayIndex === startDay) {
                        return (
                            <td key={dayIndex} colSpan={colSpan}>
                                <div>
                                    <strong
                                        title={`${vacation.startDate} ~ ${vacation.endDate}`}
                                        onClick={() => handleVacationClick(vacation)} // strong 태그에서 클릭 이벤트 발생
                                    >
                                        {vacation.onVacationMemberName}
                                    </strong>
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

    // 모달을 열고 휴가 데이터를 설정하는 함수
    const handleVacationClick = (vacation) => {
        setSelectedVacation(vacation);
        setIsModalOpen(true);
    };

    return (
        <div className="vacation-schedule-container">
            <table className="vacation-calendar-table">
                <thead>
                <tr>
                    {renderDayHeaders()}
                </tr>
                </thead>
                <tbody>
                {renderVacationRows()}
                </tbody>
            </table>

            <VacationDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                vacation={selectedVacation}
                onUpdate={onUpdateVacationIsAccepted}
                onDelete={onDeleteVacation}
            />
        </div>
    );
};
export default VacationManagementBody;
