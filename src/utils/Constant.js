/*Constant.js*/
export const ec2serverPrefix
    = 'https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/';
export const imagePrefix
    = ec2serverPrefix+'backoffice';

export const MAX_FILENAME_LENGTH = 20;

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

export const attendanceMapping = {
    "정시 출근": "ON_TIME",
    "조퇴": "HALF_DAY",
    "지각": "LATE",
    "결근": "ABSENT",
    "외근": "OUT_OF_OFFICE",
    "휴가": "VACATION",
    "휴일": "HOLIDAY",
};

export const vacationMapping = {
    "긴급한 휴가": "URGENT_LEAVE",
    "병가": "SICK_LEAVE",
    "연가": "ANNUAL_LEAVE",
};

export const NOTIFICATION_TYPE_LABELS = {
    MEMBER: "회원",
    BOARD: "게시판",
    COMMENT: "댓글",
    REPLY: "답글",
    EVENT: "이벤트",
    URGENT_VACATION: "긴급 휴가",
    URGENT_SERVER_ERROR: "긴급 서버 오류",
    EVALUATION: "평가",
    UPDATE_EVALUATION: "평가 업데이트",
    UPDATE_VACATION_PERIOD: "휴가 기간 업데이트",
    IS_ACCEPTED_VACATION: "휴가 승인 여부",
    DELETE_VACATION_FOR_ADMIN: "관리자 휴가 삭제",
    CREATE_EXPENSE_REPORT: "비용 보고서 생성",
    UPDATE_EXPENSE_REPORT_STATUS: "비용 보고서 상태 업데이트",
    UPDATE_EXPENSE_REPORT: "비용 보고서 업데이트",
    CREATE_ATTENDANCES_MANUALLY : "근태 기록 수동 작성",
    ALL_NOTIFICATIONS : "모든 멤버 알림",
};

export const AUDIT_LOG_TYPE_LABELS = {
    LOGIN: "로그인",
    LOGOUT: "로그아웃",
    SIGNUP: "회원가입",
    DELETE_MEMBER: "회원 삭제",
    CHANGE_MEMBER_ATTRIBUTE: "회원 속성 변경",
    CHANGE_MEMBER_SALARY: "급여 변경",
    CHANGE_MEMBER_REMAINING_VACATION_DAY: "남은 휴가 일수 변경",
    UPLOAD_MEMBER_FILE: "회원 파일 업로드",
    MEMBER_ERROR: "회원 오류",
    FILE_ERROR: "파일 오류",
    CREATE_FILE: "파일 생성",
    UPDATE_FILE: "파일 업데이트",
    DELETE_FILE: "파일 삭제",
    CREATE_MEMBER_VACATION: "휴가 생성",
    UPDATE_MEMBER_VACATION: "휴가 업데이트",
    CHANGE_BOARD_FILE: "게시판 파일 변경",
    CHANGE_EVENT: "이벤트 변경",
    CHANGE_SECURITY_SETTINGS: "보안 설정 변경",
    CREATE_EXPENSE_REPORT: "비용 보고서 생성",
    UPDATE_EXPENSE_REPORT_STATUS: "비용 보고서 상태 업데이트",
    UPDATE_EXPENSE_REPORT: "비용 보고서 업데이트",
    DELETE_EXPENSE_REPORT: "비용 보고서 삭제",
    READ_EXPENSE_REPORT: "비용 보고서 조회",
    EXPENSE_REPORT_ERROR: "비용 보고서 오류",
};

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

export const reverseDepartmentMapping = Object.fromEntries(
    Object.entries(departmentMapping).map(([key, value]) => [value, key])
);

export const reversePositionMapping = Object.fromEntries(
    Object.entries(positionMapping).map(([key, value]) => [value, key])
);

export const reverseVacationMapping = Object.fromEntries(
    Object.entries(vacationMapping).map(([key, value]) => [value, key])
);

export const reverseAttendanceMapping = Object.fromEntries(
    Object.entries(attendanceMapping).map(([key, value]) => [value, key])
);

export const getAuditLogTypeName = (type) => {
    return AUDIT_LOG_TYPE_LABELS[type] || type; // 매핑된 값 반환, 없으면 그대로 반환
};


export const getDepartmentName = (code) => {
    return reverseDepartmentMapping[code] || code;
};

export const getPositionName = (code) => {
    return reversePositionMapping[code] || code;
};

export const getAttendanceStatus = (name) => {
    return reverseAttendanceMapping[name] || name;
}

export const AUDIT_LOG_LABELS = Object.fromEntries(
    Object.entries(AUDIT_LOG_TYPES).map(([key, value]) => [key, value.label])
);