import PersonalEvent from "./event/GeneralEvent";
import PersonalBoard from "./board/PersonalBoard";

const PersonalContainer = () => {
    return(
        <div className="personal-container">
            <PersonalBoard/>
            <PersonalEvent/>
        </div>
    );
}
export default PersonalContainer;