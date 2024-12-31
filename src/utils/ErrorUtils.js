export const alertError = (error) => {
    alert(error.response.data.data + " : "+error.response.data.message);
}