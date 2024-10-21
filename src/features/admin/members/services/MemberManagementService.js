import axiosInstance from "../../../../utils/AxiosUtils";

export const fetchFilteredMembers = async (position, department) => {
    const response = await axiosInstance.get(`/admin/members/filtered`, {
        params: {
            position: position !== undefined ? position : null, // 값이 undefined이면 null로 처리
            department: department !== undefined ? department : null,
        }
    });

    console.log("Response data : ", response.data);
    return response.data;
};

export const fetchMemberDetails = async (memberId) => {
    const response = await axiosInstance.get(`/members/${memberId}`);
    console.log("Response data : ", response.data);
    return response.data;
}

export const updateAttribute = async (formData, memberId) => {
    try {
        const response = await axiosInstance.patch(`/members/${memberId}/attribute`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
            },
        });
        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating attribute:', error);
    }
};

export const updateRemainingVacationDays = async (memberId, changeRemainingVacationDays) => {
    try {
        const response
            = await axiosInstance.patch(`/members/${memberId}/vacations`,
            {
                vacationDays : changeRemainingVacationDays
            }
        );
        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating members vacation:', error);
    }
};

export const updateSalary = async (memberId, memberName, changeSalary) => {
    try{
        const response = await axiosInstance.patch(`/members/${memberId}/attribute/salary`, {
            memberName : memberName,
            salary : changeSalary,
        });
        console.log("Response Data:", response.data);
        return response.data;
    }catch (error){
        console.log(error);
    }
};

/*
export const updateVacationIsAccepted = async (vacationId) => {
    try {
        const response = await axiosInstance.patch(`/admin/vacations/${vacationId}`);
        return response.data;
    } catch (error) {
        console.error('휴가 승인/미승인 요청 중 오류 발생:', error);
        throw error;

    }
};

export const deleteVacation = async (vacationId, reason) => {
    try {
        // Body에 삭제 사유를 포함하여 DELETE 요청
        const response = await axiosInstance.delete(`/admin/vacations/${vacationId}`, {
            data: { reason }  // axios에서 body 데이터를 `data`로 전달
        });
        return response.data;
    } catch (error) {
        console.error('휴가 삭제 요청 중 오류 발생:', error);
        throw error;
    }
};

export const updateVacationPeriod = async (startDate, endDate) => {
    try {
        // yyyy-MM-dd'T'HH:mm:ss 형식으로 변환
        const formattedStartDate = new Date(startDate).toISOString().slice(0, 19); // 시간 포함
        const formattedEndDate = new Date(endDate).toISOString().slice(0, 19); // 시간 포함

        const response = await axiosInstance.patch('/vacations/updatePeriod', {
            startDate: formattedStartDate, // 서버가 예상하는 String 형식
            endDate: formattedEndDate      // 서버가 예상하는 String 형식
        });
        return response.data;
    } catch (error) {
        console.error('휴가 기간 업데이트 중 오류 발생:', error);
        throw error;
    }
};*/
