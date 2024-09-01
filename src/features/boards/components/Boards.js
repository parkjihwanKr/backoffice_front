import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Boards = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Boards Page</h1>
            <p className="text-center mb-5">
                Welcome to the Boards page. Here you can manage your boards and collaborate with your team.
            </p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Board</h5>
                            <p className="card-text">모든 직원 게시판</p>
                            <a href="#" className="btn btn-primary">test test test</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Department</h5>
                            <p className="card-text">Description of Board 2</p>
                            <a href="#" className="btn btn-primary">Go to Board 2</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Board 3</h5>
                            <p className="card-text">Description of Board 3</p>
                            <a href="#" className="btn btn-primary">Go to Board 3</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boards;