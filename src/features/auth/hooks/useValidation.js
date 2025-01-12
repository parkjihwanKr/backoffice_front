const useValidation = () => {
    const validateForm = (formData) => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|naver\.com)$/;
        const contactRegex = /^010-\d{4}-\d{4}$/;

        if (!passwordRegex.test(formData.password)) {
            return "비밀번호는 8자 이상 16자 이하로 입력해주세요.";
        }

        if (formData.password !== formData.passwordConfirm) {
            return "비밀번호와 비밀번호 확인 부분의 양식이 일치하지 않습니다.";
        }

        if (!emailRegex.test(formData.email)) {
            return "유효한 이메일 형식을 입력해주세요. 예: example@gmail.com 또는 example@naver.com";
        }

        if (!contactRegex.test(formData.contact)) {
            return "유효한 연락처 형식을 입력해주세요. 예: 010-1234-5678";
        }

        return null; // 유효성 검증 성공
    };

    return { validateForm };
};

export default useValidation;
