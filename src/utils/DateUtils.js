let cachedToday = null;

const DateUtils = {
    // 오늘 날짜 반환
    getToday: function () {
        if(!cachedToday || cachedToday.getDate() != new Date().getDate()){
            cachedToday = new Date();
            cachedToday.setHours(0, 0, 0, 0); // 자정 시간으로 설정
        }
        if (!cachedToday || this.isDateStale(cachedToday)) {
            cachedToday = new Date();
            cachedToday.setHours(0, 0, 0, 0); // 자정 시간으로 설정
        }
        return cachedToday;
    },

    // 특정 Date 객체를 ISO 8601 문자열("YYYY-MM-DDTHH:mm:ss")로 변환
    formatDateTimeToISOString: function (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },

    // 오늘 날짜를 ISO 8601 문자열로 반환 (자정 기준)
    getTodayAsISOString: function () {
        return this.formatDateTimeToISOString(this.getToday());
    },

    // 현재 시간을 ISO 8601 문자열("YYYY-MM-DDTHH:mm:ss")로 반환
    getCurrentTimeAsISOString: function () {
        const now = new Date();
        return this.formatDateTimeToISOString(now);
    },

    // 날짜가 오래되었는지 확인
    isDateStale: function (date) {
        const now = new Date();
        return now.getDate() !== date.getDate() ||
            now.getMonth() !== date.getMonth() ||
            now.getFullYear() !== date.getFullYear();
    },

    // 특정 날짜가 오늘과 동일한지 확인
    isToday: function (date) {
        if (!(date instanceof Date)) {
            throw new Error("The parameter must be a Date object.");
        }
        const today = this.getToday();
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    },
};

export default DateUtils;
