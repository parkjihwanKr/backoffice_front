/*Constant.js*/
export const imagePrefix
    = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/backoffice';
export const DEPARTMENTS = ["인사부", "세일즈부", "마케팅부", "아이티부", "회계부", "재정부"];
export const ROLES = ["직원", "관리자", "메인 관리자"];
export const POSITIONS = ["사장", "부장", "차장", "과장", "주임", "인턴"];
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
    "부장": "MANAGER",
    "과장": "DEPUTY_MANAGER",
    "차장": "ASSISTANT_MANAGER",
    "주임": "SENIOR_STAFF",
    "인턴": "INTERN"
};

// Constant.js

export const AUDIT_LOG_TYPES = {
    LOGIN: { label: "LOGIN" },
    LOGOUT: { label: "LOGOUT" },
    SIGNUP: { label: "SIGNUP" },
    DELETE_MEMBER: { label: "DELETE_MEMBER" },
    CHANGE_MEMBER_ATTRIBUTE: { label: "CHANGE_MEMBER_ATTRIBUTE" },
    CHANGE_MEMBER_SALARY: { label: "CHANGE_MEMBER_SALARY" },
    CHANGE_MEMBER_REMAINING_VACATION_DAY: { label: "CHANGE_REMAINING_VACATION_DAY" },
    UPLOAD_MEMBER_FILE: { label: "CHANGE_MEMBER_FILE" },
    MEMBER_ERROR: { label: "MEMBER_ERROR" },
    FILE_ERROR: { label: "FILE_ERROR" },
    CREATE_FILE: { label: "CREATE_FILE" },
    UPDATE_FILE: { label: "UPDATE_FILE" },
    DELETE_FILE: { label: "DELETE_FILE" },
    CREATE_MEMBER_VACATION: { label: "CREATE_MEMBER_VACATION" },
    UPDATE_MEMBER_VACATION: { label: "UPDATE_MEMBER_VACATION" },
    CHANGE_BOARD_FILE: { label: "CHANGE_BOARD_FILE" },
    CHANGE_EVENT: { label: "CHANGE_EVENT" },
    CHANGE_SECURITY_SETTINGS: { label: "CHANGE_SECURITY_SETTINGS" },
    CREATE_EXPENSE_REPORT: { label: "CREATE_EXPENSE_REPORT" },
    UPDATE_EXPENSE_REPORT_STATUS: { label: "UPDATE_EXPENSE_REPORT_STATUS" },
    UPDATE_EXPENSE_REPORT: { label: "UPDATE_EXPENSE_REPORT" },
    DELETE_EXPENSE_REPORT: { label: "DELETE_EXPENSE_REPORT" },
    READ_EXPENSE_REPORT: { label: "READ_EXPENSE_REPORT" },
    EXPENSE_REPORT_ERROR: { label: "EXPENSE_REPORT_ERROR" },
};

// Exporting individual labels for easier reference if needed
export const AUDIT_LOG_LABELS = Object.fromEntries(
    Object.entries(AUDIT_LOG_TYPES).map(([key, value]) => [key, value.label])
);

export const API_BASE_URL = 'http://localhost:8080/api/v1';
export const WS_BASE_URL = 'http://localhost:8080/ws-endpoint';
