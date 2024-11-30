// DateUtils.js
let cachedToday = null;

const DateUtils = {
    getToday: function () {
        if (!cachedToday || this.isDateStale(cachedToday)) {
            cachedToday = new Date();
            cachedToday.setHours(0, 0, 0, 0); // 자정 시간으로 설정
        }
        return cachedToday;
    },

    isDateStale: function (date) {
        const now = new Date();
        return now.getDate() !== date.getDate() ||
            now.getMonth() !== date.getMonth() ||
            now.getFullYear() !== date.getFullYear();
    },

    refreshToday: function () {
        cachedToday = new Date();
        cachedToday.setHours(0, 0, 0, 0); // 자정 시간으로 설정
    }
};

export default DateUtils;
