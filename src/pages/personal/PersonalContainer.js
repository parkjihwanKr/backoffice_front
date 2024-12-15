
import PersonalBoard from "./board/PersonalBoard";
import PersonalEvent from "./event/PersonalEvent";

const PersonalContainer = ({data}) => {
    const {boards, events} = data;

    return(
        <div className="personal-container">
            <PersonalBoard
                boards = {boards}/>
            <PersonalEvent
                events = {events}/>
        </div>
    );
}
export default PersonalContainer;