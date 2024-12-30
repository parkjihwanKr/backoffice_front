import { useState, useEffect } from 'react';

const useBoardForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [isFileInputActive, setIsFileInputActive] = useState(false);

    const toggleImportant = (e) => {
        e.stopPropagation();
        setIsImportant((prev) => !prev);
    };

    const toggleIsLocked = (e) => {
        e.stopPropagation();
        setIsLocked((prev) => !prev);
    }

    const toggleFileInput = () => {
        setIsFileInputActive(true);
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    // Show alert for errors
    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return {
        title,
        setTitle,
        content,
        setContent,
        isImportant,
        isLocked,
        toggleImportant,
        toggleIsLocked,
        files,
        setFiles,
        category,
        setCategory,
        error,
        setError,
        isFileInputActive,
        toggleFileInput,
        handleFileChange,
    };
};

export default useBoardForm;
