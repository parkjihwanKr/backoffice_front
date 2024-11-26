import React from "react";


export const useLoading = (loading) => {
    if (loading) {
        return <p>Loading...</p>;
    }
    return null;
};

export const useError = (error) => {
    if (error) {
        return <p>Error: {error}</p>;
    }
    return null;
};