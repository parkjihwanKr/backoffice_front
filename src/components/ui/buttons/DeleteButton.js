const DeleteButton = ({ onSubmit }) => {
    return (
        <button className="button" onClick={onSubmit}>
            삭제
        </button>
    );
};
export default DeleteButton;
