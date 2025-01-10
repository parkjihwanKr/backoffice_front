import { useMemo } from "react";

const useAttendancePagination = (currentPage, totalPages, isFebruaryWith28Days) => {
    const maxPageDisplay = 5;

    const paginationData = useMemo(() => {
        let adjustedTotalPages = totalPages;

        // 2월이 아닌 경우 총 페이지 수를 4로 제한
        if (!isFebruaryWith28Days) {
            adjustedTotalPages = 4;
        } else if (totalPages > 5) {
            adjustedTotalPages = 5;
        }

        const halfRange = Math.floor(maxPageDisplay / 2);
        let startPage = Math.max(0, currentPage - halfRange);
        let endPage = startPage + maxPageDisplay - 1;

        // 페이지 범위를 초과하지 않도록 보정
        if (endPage >= adjustedTotalPages) {
            endPage = adjustedTotalPages - 1;
            startPage = Math.max(0, endPage - maxPageDisplay + 1);
        }

        // startPage와 endPage를 기준으로 페이지 배열 생성
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return {
            pageNumbers,
            adjustedTotalPages,
        };
    }, [currentPage, totalPages, isFebruaryWith28Days]);

    return paginationData;
};

export default useAttendancePagination;
