import { useEffect, useState } from "react";
import { fetchFilteredMembers } from "../services/MemberManagementService"; // 서비스 파일 경로에 맞게 변경

const useFilteredMembers = (filters, currentPage, pageSize, updateTotalPages) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 필터링된 멤버 리스트를 가져오는 함수
    const loadFilteredMembers = async (page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const membersData = await fetchFilteredMembers(filters.position, filters.department, page, pageSize);
            setMembers(membersData.content);
            updateTotalPages(membersData.totalPages);
        } catch (error) {
            setError('멤버 데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 필터가 변경되거나 페이지가 변경될 때 필터링된 멤버 리스트를 가져옴
    useEffect(() => {
        loadFilteredMembers(currentPage);
    }, [filters, currentPage]);

    return { members, loading, error, loadFilteredMembers };
};

export default useFilteredMembers;
