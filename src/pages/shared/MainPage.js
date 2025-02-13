import React, { useEffect, useState } from 'react';
import GeneralContainer from "../general/GeneralContainer";
import PersonalContainer from "../personal/PersonalContainer";
import {fetchMainPage} from "../services/MainPageService";
import FavoritesContainer from "../personal/favorites/FavoritesContainer";
import AttendanceContainer from "../personal/attendances/AttendanceContainer";
import {alertError} from "../../utils/ErrorUtils";
import {getIsAuthenticated} from "../../utils/LocalStorageUtil";

const MainPage = () => {
    const [personalFavorites, setPersonalFavorites] = useState(null);
    const [generalData, setGeneralData] = useState({});
    const [personalData, setPersonalData] = useState({});
    const [personalAttendances, setPersonalAttendance] = useState({});

    useEffect(() => {
        if(getIsAuthenticated()){
            // alertError("인증되지 않은 사용자입니다. 로그인 해주세요.");
            // window.location.href = "/auth/login";
        }
        const loadMainPageData = async () => {
            try {
                const mainPageData = await fetchMainPage();
                setPersonalFavorites(mainPageData.personalFavoritesDtoList || []);
                setGeneralData({
                    boards: mainPageData.generalBoardDtoList || [],
                    events: mainPageData.comapnyEventDtoList || []
                });
                setPersonalData({
                    boards: mainPageData.departmentBoardDtoList || [],
                    events: mainPageData.personalVacationDtoList || [],
                });
                setPersonalAttendance({
                    attendances : mainPageData.personalAttendanceDtoList || []
                });
            } catch (error) {
                alertError(error);
            }
        };

        loadMainPageData();
    }, []);

    return (
        <div className="main-page-container">
            <FavoritesContainer
                personalFavorites={personalFavorites}/>
            {/* 전체 게시판과 일정 데이터를 GeneralContainer로 전달 */}
            <GeneralContainer
                data={generalData} />
            {/* 개인 게시판과 일정 데이터를 PersonalContainer로 전달 */}
            <PersonalContainer
                data={personalData} />
            <AttendanceContainer
                data = {personalAttendances}/>
        </div>
    );
};

export default MainPage;
