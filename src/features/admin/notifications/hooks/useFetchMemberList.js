import { useState, useEffect } from "react";
import { fetchMemberList } from "../../members/services/MemberManagementService";

export const useFetchMemberList = (isOpen) => {
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchMemberList()
                .then(data => setMemberList(data))
                .catch(error => console.error("Error fetching member list:", error));
        }
    }, [isOpen]);

    return memberList;
};
