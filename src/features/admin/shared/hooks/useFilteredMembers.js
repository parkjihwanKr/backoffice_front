import { useEffect, useState } from "react";
import { fetchFilteredMembers } from "../../members/services/MemberManagementService";
import {alertError} from "../../../../utils/ErrorUtils"; // 서비스 파일 경로에 맞게 변경

const useFilteredMembers = (filters, currentPage, pageSize, updateTotalPages) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFilteredMembers = async (page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const membersData
                = await fetchFilteredMembers(
                    filters.position, filters.department, page, pageSize);
            setMembers(membersData.content);
            updateTotalPages(membersData.totalPages);
        } catch (error) {
            setError('멤버 데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFilteredMembers(currentPage);
    }, [filters, currentPage]);

    return { members, loading, error, setMembers }; // setMembers도 반환
};

export default useFilteredMembers;
