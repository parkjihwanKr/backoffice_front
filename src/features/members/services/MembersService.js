import axiosInstance from "../../../utils/AxiosUtils";

export const fetchMemberDetails = async (memberId) => {
    const response = await axiosInstance.get(`/members/${memberId}`);
    console.log("Response data : ", response.data);
    return response.data;
}