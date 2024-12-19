import React, { useEffect, useState } from 'react';
import GeneralContainer from "../general/GeneralContainer";
import PersonalContainer from "../personal/PersonalContainer";
import {fetchMainPage} from "../services/MainPageService";
import FavoritesContainer from "../personal/favorites/FavoritesContainer";
import AttendanceContainer from "../personal/attendances/AttendanceContainer";

const MainPage = () => {
    const [personalFavorites, setPersonalFavorites] = useState(null);
    const [generalData, setGeneralData] = useState({});
    const [personalData, setPersonalData] = useState({});
    const [personalAttendances, setPersonalAttendance] = useState({});

    useEffect(() => {
        const loadMainPageData = async () => {
            try {
                const mainPageData = await fetchMainPage();
                setPersonalFavorites(mainPageData.personalFavoritesDtoList || []);
                setGeneralData({
                    boards: mainPageData.generalBoardDtoList || [],
                    events: mainPageData.departmentEventDtoList || []
                });
                setPersonalData({
                    boards: mainPageData.departmentBoardDtoList || [],
                    events: mainPageData.personalEventDtoList || [],
                });
                setPersonalAttendance({
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
            <FavoritesContainer
                personalFavorites={personalFavorites}/>
            {/* 전체 게시판과 일정 데이터를 GeneralContainer로 전달 */}
            <GeneralContainer
                data={generalData} />
            {/* 개인 게시판과 일정 데이터를 PersonalContainer로 전달 */}
            <PersonalContainer
                data={personalData} />
            <AttendanceContainer/>
        </div>
    );
};

export default MainPage;
