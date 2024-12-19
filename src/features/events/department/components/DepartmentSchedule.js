import React, {useEffect, useState} from 'react';
import {createEvent, deleteEvent, fetchSchedules, updateEvent} from '../services/DepartmentScheduleService'; // 서비스 함수들 가져오기
import CreateDepartmentScheduleModal from './header/CreateDepartmentScheduleModal';
import DepartmentScheduleHeader from './header/DepartmentScheduleHeader';
import DepartmentScheduleBody from './body/DepartmentScheduleBody';
import DepartmentScheduleFooter from './footer/DepartmentScheduleFooter';
import './DepartmentSchedule.css';
import {useParams} from "react-router-dom";
import EventDetailModal from "./body/EventDetailModal";

const DepartmentSchedule = () => {
    const { department } = useParams();

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [schedules, setSchedules] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 생성 모달 상태 관리
    const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트를 위한 상태 관리

    // API 조회
    const loadSchedules = async () => {
        try {
            const response
                = await fetchSchedules(department, currentYear, currentMonth);
            setSchedules(response);
            console.log(response);
        } catch (error) {
            alert(error.response.data.data + " : "+error.response.data.message);
            console.error("일정 조회 실패 : "+error);
        }
    };

    // 일정 업데이트 함수
    const handleUpdateEvent = async (formData, eventId) => {
        console.log(selectedEvent);
        try {
            const updatedEvent = await updateEvent(department, eventId, formData);
            setSelectedEvent(updatedEvent);
            loadSchedules();  // 일정 수정 후 일정을 다시 가져옴
            closeEventDetailModal();
        } catch (error) {
            console.error('부서 일정 수정 중 오류 발생:', error);
        }
    };

    // 일정 생성
    const handleCreateEvent = async (formData) => {
        try {
            await createEvent(department, formData); // 일정 생성 API 호출
            await loadSchedules(); // 일정 목록 다시 로드
            closeModal(); // 모달 닫기
        } catch (error) {
            console.error("일정 생성 중 오류 발생:", error);
        }
    };

    // 일정 삭제 함수
    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(department, eventId);
            loadSchedules();  // 일정 삭제 후 일정을 다시 가져옴
            closeEventDetailModal();
        } catch (error) {
            console.error('부서 일정 삭제 중 오류 발생 :', error);
        }
    };

    useEffect(() => {
        loadSchedules();  // 초기 로드 시 일정 데이터를 가져옴
    }, [currentYear, currentMonth]);

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // 모달 열기/닫기 함수
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeModal = () => setIsCreateModalOpen(false);

    const closeEventDetailModal = () => setSelectedEvent(null);

    return (
        <div>
            <DepartmentScheduleHeader
                currentYear={currentYear}
                currentMonth={currentMonth}
                onCreateModal={openCreateModal}
            />
            <DepartmentScheduleBody
                currentYear={currentYear}
                currentMonth={currentMonth}
                schedules={schedules}
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
            />
            <DepartmentScheduleFooter
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />

            {/* 생성 모달 컴포넌트 */}
            <CreateDepartmentScheduleModal
                isOpen={isCreateModalOpen}
                onClose={closeModal}
                onSubmit={handleCreateEvent}
            />

            <EventDetailModal
                isOpen={!!selectedEvent}
                onClose={closeEventDetailModal}
                event={selectedEvent}
                onUpdate={handleUpdateEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    );
};

export default DepartmentSchedule;
