import { useEffect, useState } from "react";
import { fetchMemberDetails } from "../../../services/MembersService";

const useUpdateMemberDetails = (memberId) => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMemberDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const memberData = await fetchMemberDetails(memberId);
            setMember(memberData);
        } catch (error) {
            setError('멤버 정보를 가져오는 중 오류가 발생했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMemberDetails();
    }, [memberId]);

    return { member, loading, error, setMember };
};

export default useUpdateMemberDetails;