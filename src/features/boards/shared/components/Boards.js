import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AllBoards from '../../general/components/AllBoard';
import DepartmentBoards from '../../department/components/DepartmentBoard';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Boards = () => {
    const [showModal, setShowModal] = useState(false);
    const [departments] = useState(['HR', 'FINANCE', 'IT', 'MARKETING', 'SALES', 'AUDIT']);
    const [selectedDepartment, setSelectedDepartment] = useState(''); // 빈 문자열로 초기화
    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = () => {
        if (selectedDepartment) {
            console.log(`Navigating to /department-boards/${selectedDepartment}`);
            navigate(`/department-boards/${selectedDepartment}`);
            handleCloseModal();
        } else {
            alert('부서를 선택하세요.');
        }
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Boards Page</h1>
            <p className="text-center mb-5">
                Welcome to the Boards page. Here you can manage your boards and collaborate with your team.
            </p>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">전체 게시판</h5>
                            <p className="card-text">모든 직원 게시판</p>
                            <img
                                src="https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/companyBoard.png"
                                alt="전체 게시판 이미지"
                                className="img-fluid"
                                style={{
                                    width: '100%',
                                    height: '450px',
                                    objectFit: 'cover',
                                    border: '0px solid #000'
                                }}
                            />
                            <hr />
                            <Button href="/all-boards" className="btn btn-primary">Go to All Boards</Button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">부서 게시판</h5>
                            <p className="card-text">부서별 게시판</p>
                            <img
                                src="https://pjhawss3bucket.s3.ap-northeast-2.amazonaws.com/departmentBoard.png"
                                alt="부서 게시판 이미지"
                                className="img-fluid"
                                style={{
                                    width: '100%',
                                    height: '450px',
                                    objectFit: 'cover',
                                    border: '0px solid #000'
                                }}
                            />
                            <hr/>
                            <Button onClick={handleShowModal} className="btn btn-primary mt-3">Go to Department Boards</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>부서 선택</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>어떤 부서의 게시판으로 접속하시겠습니까?</p>
                    <Form.Group controlId="departmentSelect">
                        <Form.Control
                            as="select"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                            <option value="">부서를 선택하세요</option> {/* 기본 선택 옵션 */}
                            {departments.map(department => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Routes>
                <Route path="/all-boards" element={<AllBoards />} />
                <Route path="/department-boards/:department" element={<DepartmentBoards />} />
            </Routes>
        </div>
    );
};

export default Boards;
