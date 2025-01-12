import { useState } from "react";
import { checkUsernameAvailability } from "../services/AuthService";
import {alertError} from "../../../utils/ErrorUtils";

const useUsernameAvailability = () => {
    const [isChecking, setIsChecking] = useState(false);

    const handleUsernameCheck = async (username) => {
        setIsChecking(true);
        try {
            const isAvailable = await checkUsernameAvailability(username);
            return isAvailable;
        } catch (error) {
            alertError(error);
        } finally {
            setIsChecking(false);
        }
    };

    return { isChecking, handleUsernameCheck };
};

export default useUsernameAvailability;
