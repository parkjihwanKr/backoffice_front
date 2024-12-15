import React, { useEffect, useState } from 'react';
import GeneralContainer from "../general/GeneralContainer";
import PersonalContainer from "../personal/PersonalContainer";
import {fetchMainPage} from "../services/MainPageService";
import FavoritesContainer from "../personal/favorites/FavoritesContainer";
import AttendanceContainer from "../personal/attendances/AttendanceContainer";

const MainPage = () => {
    const [generalData, setGeneralData] = useState({}); // 전체 게시판 및 일정 데이터를 저장
    const [personalData, setPersonalData] = useState({}); // 개인 게시판 및 일정 데이터를 저장

    useEffect(() => {
        const loadMainPageData = async () => {
            try {
                const mainPageData = await fetchMainPage();
                setGeneralData({
                    boards: mainPageData.generalBoardDtoList || [],
                    events: mainPageData.generalEventDtoList || []
                });
                setPersonalData({
                    boards: mainPageData.departmentBoardDtoList || [],
                    events: mainPageData.personalEventDtoList || [],
                    attendances : mainPageData.personalAttendanceDtoList || []
                });
            } catch (error) {
                alert(error.response.data.data +" : "+error.response.data.message);
            }
        };

        loadMainPageData();
    }, []);

    return (
        <div className="main-page-container">
            <FavoritesContainer/>
            {/* 전체 게시판과 일정 데이터를 GeneralContainer로 전달 */}
            <GeneralContainer data={generalData} />
            {/* 개인 게시판과 일정 데이터를 PersonalContainer로 전달 */}
            <PersonalContainer data={personalData} />
            <AttendanceContainer/>
        </div>
    );
};

export default MainPage;
