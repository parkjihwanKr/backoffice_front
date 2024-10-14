/*VacationManagement.js*/
import React, { useState, useEffect } from 'react';
import { fetchAllVacations, updateVacationIsAccepted, deleteVacation } from '../services/VacationManagementService'; // 서비스 함수들 가져오기
import VacationManagementHeader from './header/VacationManagementHeader';
import VacationManagementBody from './body/VacationManagementBody';
import VacationManagementFooter from './footer/VacationManagementFooter';
import VacationDetailModal from './body/VacationDetailModal';
import './VacationManagement.css';

const VacationManagement = () => {
    const [vacations, setVacations] = useState([]);
    const [selectedVacation, setSelectedVacation] = useState(null); // 선택된 휴가 정보를 위한 상태 관리

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    // 모든 멤버의 휴가 데이터를 불러오는 함수
    const loadVacations = async () => {
        let response = null;
        try {
            response = await fetchAllVacations(currentYear, currentMonth +1);
            setVacations(response); // API에서 받은 데이터를 상태에 저장
        } catch (error) {
            console.error('휴가 데이터를 가져오는 중 오류가 발생했습니다.', error);
        }
    };

    useEffect(() => {
        loadVacations();  // 컴포넌트 마운트 시 휴가 데이터를 불러옴
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
    const openVacationDetailModal = (vacation) => {
        setSelectedVacation(vacation); // 휴가 상세 보기
    };
    const closeVacationDetailModal = () => setSelectedVacation(null);

    // 휴가 수정 함수
    const handleUpdateVacationIsAceppted = async (formData, vacationId) => {
        try {
            await updateVacationIsAccepted(vacationId, formData);
            loadVacations('all');  // 휴가 수정 후 다시 불러오기
            closeVacationDetailModal();
        } catch (error) {
            console.error('휴가 수정 중 오류 발생:', error);
        }
    };

    // 휴가 삭제 함수
    const handleDeleteVacation = async (vacationId) => {
        try {
            await deleteVacation(vacationId);
            loadVacations('all');  // 휴가 삭제 후 다시 불러오기
            closeVacationDetailModal();
        } catch (error) {
            console.error('휴가 삭제 중 오류 발생:', error);
        }
    };

    return (
        <div className="vacation-management">
            <VacationManagementHeader
                currentYear = {currentYear}
                currentMonth = {currentMonth}
            />
            <VacationManagementBody
                currentYear={currentYear}
                currentMonth={currentMonth}
                vacations={vacations}
                onUpdateVacationIsAccpeted={handleUpdateVacationIsAceppted}  // 수정 함수 전달
                onDeleteVacation={handleDeleteVacation}  // 삭제 함수 전달
            />
            <VacationManagementFooter />

            {/* 휴가 상세 정보 모달 */}
            <VacationDetailModal
                isOpen={!!selectedVacation}
                onClose={closeVacationDetailModal}
                vacation={selectedVacation}
                onUpdate={handleUpdateVacationIsAceppted}
                onDelete={handleDeleteVacation}
            />
        </div>
    );
};

export default VacationManagement;
