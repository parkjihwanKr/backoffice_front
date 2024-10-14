import axiosInstance from "../../../../utils/AxiosUtils";

export const fetchAllVacations = async (year, month) => {

    const response
        = await axiosInstance.get(`/vacations/years/${year}/months/${month}/all`);
    console.log("Response data: ", response.data);
    return response.data;
}

export const updateVacationIsAccepted = async (vacationId, updatedVacationData) => {

}

export const deleteVacation = async (vacationId) => {

}