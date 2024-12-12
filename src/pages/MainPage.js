// /src/pages/HomePage.js
import React from 'react';
import GeneralContainer from "./general/GeneralContainer";
import PersonalContainer from "./personal/PersonalContainer";

const MainPage = () => {
    return (
        <div className="main-page-container">
            {/*전체 게시판, 전체 일정표*/}
            <GeneralContainer/>
            {/*부서 게시판, 개인 일정표, 당일 개인 근태 기록표*/}
            <PersonalContainer/>
        </div>
    );
};

export default MainPage;