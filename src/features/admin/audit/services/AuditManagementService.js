import axiosInstance from '../../../../utils/AxiosUtils';

// API 호출 함수: 필터와 페이지에 따라 서버에서 감사 로그를 가져옵니다.
export const fetchAuditList = async (filters = {}, page = 0) => {
    console.log("fetchAuditList start!");
    try {
        const response
            = await axiosInstance.get('/auditLogs/filtered', {
            params: {...filters, page,},
        });
        console.log(response.data.content);
        return { data: response.data.content, totalPages: response.data.totalPages };
    } catch (err) {
        console.error('Error fetching audit logs:', err);
        throw err;
    }
};
