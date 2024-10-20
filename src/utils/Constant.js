/*Constant.js*/
export const imagePrefix
    = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';
export const DEPARTMENTS = ["인사부", "세일즈부", "마케팅부", "아이티부", "회계부", "재정부"];
export const ROLES = ["직원", "관리자", "메인 관리자"];
export const POSITIONS = ["사장", "차장", "과장", "대리", "주임", "인턴"];
export const departmentMapping = {
    "인사부": "HR",
    "마케팅부": "MARKETING",
    "아이티부": "IT",
    "재정부": "FINANCE",
    "세일즈부": "SALES",
    "회계부": "AUDIT"
};

export const roleMapping = {
    "직원": "EMPLOYEE",
    "관리자": "ADMIN",
    "매인 관리자": "MAIN_ADMIN"
}

// 서버로 전송할 값에 맞게 변환해줄 매핑 테이블
export const positionMapping = {
    "사장": "CEO",
    "차장": "MANAGER",
    "과장": "DEPUTY_MANAGER",
    "대리": "ASSISTANT_MANAGER",
    "주임": "SENIOR_STAFF",
    "인턴": "INTERN"
};