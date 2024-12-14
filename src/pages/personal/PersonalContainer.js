
import PersonalBoard from "./board/PersonalBoard";
import PersonalEvent from "./event/PersonalEvent";

const PersonalContainer = ({data}) => {
    const {boards, events, attendances} = data;
    console.log("test : "+boards);
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