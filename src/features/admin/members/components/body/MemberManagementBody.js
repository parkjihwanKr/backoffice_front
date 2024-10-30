import { useNavigate } from 'react-router-dom';
import { imagePrefix } from "../../../../../utils/Constant";
import useFilteredMembers from "../../../shared/hooks/useFilteredMembers";
import UpdateSalaryModal from './UpdateSalaryModal'; // 급여 변경 모달 임포트
import './MemberManagementBody.css';
import '../../../shared/components/table.css';
import React, { useState } from 'react';

const MemberManagementBody = ({ filters, currentPage, updateTotalPages }) => {
    const pageSize = 10; // 페이지당 표시할 멤버 수
    const navigate = useNavigate();
    const { members, setMembers, loading, error } = useFilteredMembers(filters, currentPage, pageSize, updateTotalPages); // setMembers 추가

    const [selectedMember, setSelectedMember] = useState(null); // 선택된 멤버
    const [showSalaryModal, setShowSalaryModal] = useState(false); // 급여 변경 모달 상태

    const goToMemberDetails = (memberId) => {
        navigate(`/members/${memberId}`);
    };

    const openSalaryModal = (member) => {
        setSelectedMember(member);
        setShowSalaryModal(true);
    };

    const handleSaveSalary = (newSalary) => {
        // 전체 멤버 목록에서 해당 멤버의 급여 업데이트
        setMembers((prevMembers) =>
            prevMembers.map((m) =>
                m.memberId === selectedMember.memberId ? { ...m, salary: newSalary } : m
            )
        );
        setShowSalaryModal(false); // 모달 닫기
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (members.length === 0) {
        return <div className="member-management-body-no-member">
            해당 조건의 사람이 없습니다.
        </div>;
    }

    return (
        <div className="member-management-body">
            <table className="table">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>부서</th>
                    <th>직위</th>
                    <th>입사일</th>
                    <th>급여</th>
                    <th>급여 변경</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.memberId}>
                        <td>{member.memberName}</td>
                        <td>{member.email}</td>
                        <td>{member.department}</td>
                        <td>{member.position}</td>
                        <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                        <td>{member.salary ? Number(member.salary).toLocaleString() : '정보 없음'} 원</td>
                        <td>
                            <img
                                src={`${imagePrefix}/shared/change_salary.png`}
                                className="member-management-body-table-img"
                                onClick={() => openSalaryModal(member)} // 모달 열기
                                alt="급여 변경"
                            />
                        </td>
                        <td>
                            <img
                                className="member-management-member-details"
                                src={`${imagePrefix}/shared/find_member.png`}
                                alt="상세보기"
                                onClick={() => goToMemberDetails(member.memberId)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 급여 변경 모달 */}
            {showSalaryModal && (
                <UpdateSalaryModal
                    member={selectedMember}
                    onClose={() => setShowSalaryModal(false)}
                    onSave={handleSaveSalary} // 변경된 급여를 저장
                />
            )}
        </div>
    );
};

export default MemberManagementBody;
