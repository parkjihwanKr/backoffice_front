/*CompanySchedule.js*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanySchedule.css';
import {getCookie} from "../../../../utils/CookieUtil";

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const CompanySchedule = () => {
    const accessToken = getCookie('accessToken');
    const [currentYear, setCurrentYear] = useState(2024);
    const [currentMonth, setCurrentMonth] = useState(8); // 8 = 9월
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // Spring Boot API 호출
        const fetchSchedules = async () => {
            try {
                const response
                    = await axios.get(`/events/years/${currentYear}/months/${currentMonth + 1}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // accessToken을 헤더로 추가
                    },
                });
                setSchedules(response.data);
            } catch (error) {
                console.error('일정 데이터를 가져오는 중 오류가 발생했습니다.', error);
            }
        };
        fetchSchedules();
    }, [currentYear, currentMonth]);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

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

    const formatDate = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>회사 일정표 - {currentYear}년 {currentMonth + 1}월</h2>
            <div>
                <button onClick={handlePrevMonth}>이전 달</button>
                <button onClick={handleNextMonth}>다음 달</button>
            </div>
            <table className="calendar-table">
                <thead>
                <tr>
                    {[...Array(daysInMonth)].map((_, day) => (
                        <th key={day}>{day + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {[...Array(daysInMonth)].map((_, day) => {
                        const currentDate = formatDate(currentYear, currentMonth, day + 1);
                        const currentDayOfWeek = new Date(currentYear, currentMonth, day + 1).getDay();
                        const dailySchedules = schedules.filter(schedule => schedule.startDate.includes(currentDate));

                        return (
                            <td
                                key={day}
                                className={currentDayOfWeek === 6 ? 'saturday' : currentDayOfWeek === 0 ? 'sunday' : ''}
                            >
                                {day + 1}
                                <div>
                                    {dailySchedules.map(schedule => (
                                        <div key={schedule.eventId}>
                                            <strong>{schedule.vacationMemberName}</strong><br />
                                            <small>{schedule.startDate.split('T')[0]}</small> ~ <small>{schedule.endDate.split('T')[0]}</small>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        );
                    })}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CompanySchedule;
