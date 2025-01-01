export const successAlert = (message) => {
    alert(message);
}
export const alertError = (error) => {
    alert(
        error.response?.data?.data
            ? `${error.response.data.data} : ${error.response.data.message}`
            : error.message
    );
}