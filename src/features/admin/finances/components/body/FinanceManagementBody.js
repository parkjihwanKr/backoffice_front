import './FinanceManagementBody.css';

const FinanceManagementBody = () => {
    const content = [
        "1. 금융 결제원에 자산 조회 버튼 : Request Button",
        "1-1. 요청에 필요한 requestToken을 보냄",
        "1-2. 요청에 대한 응답으로 밑과 같은 상황이 f12 개발자 도구에서 나오면 성공",
        '1-3. rsp_message : "응답 요청에 실패하셨습니다."',
        '1-4. rsp_code : "RESPONSE-008"',
        "해당 사항 고찰 : ",
        "카카오 페이를 통한 결제 시스템 -> 이미 만들어봄",
        "금융 결제원 -> 개인 프로젝트에 대한 가상 계좌 승인 요청을 할 수 없음",
        "가상으로 데이터를 만들어서 운영 -> 의미가 있나? 싶음"
    ];

    return (
        <div className="finance-management-body">
            {content.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
            <button>
                Request Button
            </button>
        </div>
    );
};

export default FinanceManagementBody;
